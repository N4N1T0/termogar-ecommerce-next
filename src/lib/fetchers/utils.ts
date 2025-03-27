export const loginEnvelop = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
xmlns:tem="http://tempuri.org/">
   <soapenv:Header>
      <tem:ROClientIDHeader>
         <!--Optional:-->
         <tem:ID></tem:ID>
      </tem:ROClientIDHeader>
   </soapenv:Header>
   <soapenv:Body>
      <tem:LoginWSService___LoginCli>
         <tem:strCodAge>${process.env.TIPSA_AGENCY}</tem:strCodAge>
         <tem:strCod>${process.env.TIPSA_USER}</tem:strCod>
         <tem:strPass>${process.env.TIPSA_PASSWORD}</tem:strPass>
      </tem:LoginWSService___LoginCli>
   </soapenv:Body>
</soapenv:Envelope>`

export const grabaEnvio24 = (
  dtFecha: string,
  strCodTipoServ: string,
  strNomDes: string,
  strDirDes: string,
  strPobDes: string,
  strCPDes: string,
  strTlfDes: string,
  intPaq: number,
  strContenido: string,
  id: string,
  strDesDirEmails: string
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header>
      <tem:ROClientIDHeader>
         <tem:ID>${id}</tem:ID>
      </tem:ROClientIDHeader>
   </soapenv:Header>
   <soapenv:Body>
      <tem:GrabaEnvio24>
         <tem:strCodAgeCargo>${process.env.TIPSA_AGENCY}</tem:strCodAgeCargo>
         <tem:strCodAgeOri>${process.env.TIPSA_AGENCY}</tem:strCodAgeOri>
         <tem:dtFecha>${dtFecha}</tem:dtFecha>
         <tem:strCodTipoServ>${strCodTipoServ}</tem:strCodTipoServ>
         <tem:strCodCli>${process.env.TIPSA_USER}</tem:strCodCli>
         <tem:strNomOri>Termogar.es</tem:strNomOri>
         <tem:strDirOri>C/ Cerrajería, 12 - Polígono el Palmar.</tem:strDirOri>
         <tem:strPobOri>Cadiz</tem:strPobOri>
         <tem:strCPOri>11500</tem:strCPOri>
         <tem:strTlfOri>956 861 081 / 667 525 413</tem:strTlfOri>
         <tem:strNomDes>${strNomDes}</tem:strNomDes>
         <tem:strDirDes>${strDirDes}</tem:strDirDes>
         <tem:strPobDes>${strPobDes}</tem:strPobDes>
         <tem:strCPDes>${strCPDes}</tem:strCPDes>
         <tem:strCodPais>ES</tem:strCodPais>
         <tem:strTlfDes>${strTlfDes}</tem:strTlfDes>
         <tem:intPaq>${intPaq}</tem:intPaq>
         <tem:strContenido>${strContenido}</tem:strContenido>
         <tem:boInsert>true</tem:boInsert>
         <tem:strAlbaran></tem:strAlbaran>
         <ns0:boDesSMS>true</ns0:boDesSMS>
         <ns0:boDesEmail>true</ns0:boDesEmail>
         <ns0:strDesMoviles>${strTlfDes}</ns0:strDesMoviles>
         <ns0:strDesDirEmails>${strDesDirEmails}</ns0:strDesDirEmails>
      </tem:GrabaEnvio24>
   </soapenv:Body>
</soapenv:Envelope>`
}

export const construirEtiqueta8 = (
  strAlbaran: string,
  id: string
) => `<?xml version="1.0" encoding="UTF-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
     <soapenv:Header>
        <tem:ROClientIDHeader>
           <tem:ID>${id}</tem:ID>
        </tem:ROClientIDHeader>
     </soapenv:Header>
     <soapenv:Body>
        <tem:ConsEtiquetaEnvio6>
           <tem:strCodAgeOri>${process.env.TIPSA_AGENCY}</tem:strCodAgeOri>
           <tem:strCodAgeCargo>${process.env.TIPSA_AGENCY}</tem:strCodAgeCargo>
           <tem:StrAlbaran>${strAlbaran}</tem:StrAlbaran>
           <tem:intIdRepDet>0</tem:intIdRepDet>
           <tem:strFormato>pdf</tem:strFormato>
        </tem:ConsEtiquetaEnvio6>
     </soapenv:Body>
  </soapenv:Envelope>`

export const factusolBody = JSON.stringify({
  codigoFabricante: Number(process.env.BUILDERCODE),
  codigoCliente: Number(process.env.CLIENTCODE),
  baseDatosCliente: String(process.env.DATABASE),
  password: btoa(process.env.DBPASSWORD || '')
})

export const tipsaURLWebService =
  'https://ws.tipsa-dinapaq.com/SOAP?service=LoginWSService'
export const tipsaURLWebServiceLogin =
  'https://ws.tipsa-dinapaq.com/SOAP?service=WebServService'
