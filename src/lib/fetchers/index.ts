import { CartItemType, YoptopReviews } from "@/types";
import { parseStringPromise } from "xml2js";
import {
  grabaEnvio24,
  loginEnvelop,
  construirEtiqueta8,
  factusolBody,
  tipsaURLWebServiceLogin,
  tipsaURLWebService,
} from "./utils";

// CONST
const yoptopAppKey = process.env.NEXT_PUBLIC_YOTPO_APP_KEY;
const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;

const yoptop = {
  fetchReviews: async (
    id: string
  ): Promise<{ status: number; reviews: YoptopReviews }> => {
    const reviews = await fetch(
      `https://api-cdn.yotpo.com/v1/widget/${yoptopAppKey}/products/${id}/reviews.json`
    );
    if (!reviews.ok) {
      return {
        status: 0,
        reviews: [],
      };
    }
    const data = await reviews.json();
    return {
      status: data.status?.code,
      reviews: data.response.reviews,
    };
  },
  createReviews: async (
    options: RequestInit
  ): Promise<{ status: number; data: string }> => {
    const response = await fetch(
      "https://api.yotpo.com/v1/widget/reviews",
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      status: data.code,
      data: data.message,
    };
  },
  rateReview: async (
    options: RequestInit,
    reviewId: string,
    voteType: "up" | "down"
  ): Promise<{ status: number; data: string }> => {
    const response = await fetch(
      `https://api.yotpo.com/reviews/${reviewId}/vote/${voteType}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      status: data.status.code,
      data: data.status.message,
    };
  },
};

const paypal = {
  generateAccessToken: async (): Promise<string> => {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${paypalClientId}:${paypalClientSecret}`)}`,
        },
        body: "grant_type=client_credentials",
      }
    );
    const data = await response.json();
    return data.access_token;
  },
  createOrder: async function (
    products: CartItemType[],
    redirectUrl: (page: string, gateway?: string) => string,
    totalAmount: number
  ): Promise<string> {
    const accessToken = await this.generateAccessToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYPAL_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              items: [
                ...products.map((product) => ({
                  name: product.title,
                  description: product.excerpt
                    ?.split(" ")
                    .slice(0, 10)
                    .join(" "),
                  quantity: product.quantity,
                  unit_amount: {
                    currency_code: "EUR",
                    value: product.sale ? product.sale.price : product.price,
                  },
                })),
              ],

              amount: {
                currency_code: "EUR",
                value: Number(totalAmount).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: Number(totalAmount).toFixed(2),
                  },
                },
              },
            },
          ],

          application_context: {
            return_url: redirectUrl("exito", "PayPal"),
            cancel_url: redirectUrl("fallo", "PayPal"),
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            brand_name: "Termogar",
          },
        }),
      }
    );
    const data = await response.json();

    return data.links.find(
      (link: Record<string, string>) => link.rel === "approve"
    ).href;
  },
  captureOrder: async function (orderId: string): Promise<string> {
    const accessToken = await this.generateAccessToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.status;
  },
};

const tipsa = {
  generateSessionId: async () => {
    try {
      const response = await fetch(tipsaURLWebServiceLogin, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
        },
        body: loginEnvelop,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      // Parsear el XML de la respuesta
      const result = await parseStringPromise(data, { explicitArray: false });

      // Extraer strSesion de la respuesta
      const sessionId =
        result["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"]?.[
          "v1:LoginWSService___LoginCliResponse"
        ]?.["v1:strSesion"];

      if (!sessionId) {
        throw new Error("Session ID not found in response");
      }

      return sessionId; // Devuelve el ID de sesión
    } catch (error) {
      console.error("Error creating SOAP client:", error);
      throw error;
    }
  },
  grabaEnvio24: async function (
    dtFecha: string,
    strCodTipoServ: string,
    strNomDes: string,
    strDirDes: string,
    strPobDes: string,
    strCPDes: string,
    strTlfDes: string,
    intPaq: number,
    strContenido: string,
    strDesDirEmails: string
  ) {
    try {
      const sessionId = await this.generateSessionId();

      const response = await fetch(tipsaURLWebService, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
        },
        body: grabaEnvio24(
          dtFecha,
          strCodTipoServ,
          strNomDes,
          strDirDes,
          strPobDes,
          strCPDes,
          strTlfDes,
          intPaq,
          strContenido,
          sessionId,
          strDesDirEmails
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      // Parsear el XML de la respuesta
      const result = await parseStringPromise(data, { explicitArray: false });
      const albaran =
        result["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"]?.[
          "v1:WebServService___GrabaEnvio24Response"
        ]?.["v1:strAlbaranOut"];

      return albaran;
    } catch (error) {
      console.error("Error creating SOAP client:", error);
      throw error;
    }
  },
  construirEtiqueta8: async function (strAlbaran: string) {
    try {
      const sessionId = await this.generateSessionId();

      const response = await fetch(tipsaURLWebService, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
        },
        body: construirEtiqueta8(strAlbaran, sessionId),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      // Parsear el XML de la respuesta
      const result = await parseStringPromise(data, { explicitArray: false });
      const etiqueta =
        result["SOAP-ENV:Envelope"]?.["SOAP-ENV:Body"]?.[
          "v1:WebServService___ConsEtiquetaEnvio6Response"
        ]?.["v1:strEtiqueta"];

      return etiqueta;
    } catch (error) {
      console.error("Error creating SOAP client:", error);
      throw error;
    }
  },
};

const factusol = {
  generateAccessToken: async () => {
    try {
      const response = await fetch("https://api.sdelsol.com/login/autenticar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: factusolBody,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("🚀 ~ generateAccessToken: ~ data:", data);
      return data.resultado;
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  },
  getAllProductsStock: async function () {
    try {
      const token = await this.generateAccessToken();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        ejercicio: "2023",
        tabla: "F_ART",
        filtro: "",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(
        "https://api.sdelsol.com/admin/CargaTabla",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // const products = data.resultado.map((product) => ({
      //   id: product.CODART,
      //   stock: product.STOCK
      // }))

      return data;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  },
};

export { yoptop, paypal, tipsa, factusol };
