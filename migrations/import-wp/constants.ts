import type { SanitySchemaType, WordPressDataType } from './types'

// export const BASE_URL = `https://termogar.es/wp-json/wp/v2`
export const BASE_URL = `https://termogar.es/wp-json/wc/v3`
export const PER_PAGE = 10
export const CONSUMER_KEY = 'ck_f55ae036b58b2154c2bdb07faa3b64eb669b2750'
export const CONSUMER_SECRET = 'cs_383e2ce0c13d65e86a8209b86356632a2501ff84'

export const WP_TYPE_TO_SANITY_SCHEMA_TYPE: Record<
  WordPressDataType,
  SanitySchemaType
> = {
  categories: 'category',
  posts: 'post',
  pages: 'page',
  tags: 'tag',
  users: 'author',
  products: 'product',
  product_cat: 'productCategory',
  product_tag: 'productTag',
  coupons: 'coupon',
  customers: 'customers'
}

export const pageSlugArray = [
  'https://termogar.es/mi-cuenta/seguimiento-de-pedidos/',
  'https://termogar.es/contacto/',
  'https://termogar.es/condiciones-del-plan-renove/',
  'https://termogar.es/terminos-y-condiciones-de-uso/',
  'https://termogar.es/aviso-legal/',
  'https://termogar.es/politica-de-privacidad/',
  'https://termogar.es/politica-de-cookies/',
  'https://termogar.es/opiniones-de-nuestros-clientes/',
  'https://termogar.es/solicita-presupuesto/',
  'https://termogar.es/servicio-de-atencion-al-cliente/',
  'https://termogar.es/servicio-de-atencion-al-cliente/catalogo-de-articulos/encuentra-tu-producto/',
  'https://termogar.es/servicio-de-atencion-al-cliente/gestion-pedidos-como-comprar-consulta-modificaciones-cancelacion/realizar-pedido-paso-paso/',
  'https://termogar.es/servicio-de-atencion-al-cliente/envio-y-entrega/termogar-envio-gratuito-sin-pedido-minimo/',
  'https://termogar.es/servicio-de-atencion-al-cliente/pago-seguro/medios-pago-disponibles/',
  'https://termogar.es/servicio-de-atencion-al-cliente/gestion-pedidos-como-comprar-consulta-modificaciones-cancelacion/confirmacion-de-pedidos/',
  'https://termogar.es/servicio-de-atencion-al-cliente/gestion-pedidos-como-comprar-consulta-modificaciones-cancelacion/quiero-modificar-pedido/',
  'https://termogar.es/servicio-de-atencion-al-cliente/gestion-pedidos-como-comprar-consulta-modificaciones-cancelacion/puedo-cancelar-pedido/',
  'https://termogar.es/servicio-de-atencion-al-cliente/envio-y-entrega/localiza-tu-pedido/',
  'https://termogar.es/servicio-de-atencion-al-cliente/envio-y-entrega/plazos-horarios-entrega/',
  'https://termogar.es/servicio-de-atencion-al-cliente/envio-y-entrega/recoger-pedido-nuestra-tienda/',
  'https://termogar.es/servicio-de-atencion-al-cliente/facturacion/',
  'https://termogar.es/servicio-de-atencion-al-cliente/servicio-postventa-garantia-devoluciones/',
  'https://termogar.es/servicio-de-atencion-al-cliente/servicio-postventa-garantia-devoluciones/quiero-realizar-una-devolucion/',
  'https://termogar.es/servicio-de-atencion-al-cliente/derecho-de-desestimiento/',
  'https://termogar.es/servicio-de-atencion-al-cliente/servicio-postventa-garantia-devoluciones/he-recibido-producto-defectuoso-malas-condiciones-causa-del-transporte/',
  'https://termogar.es/servicio-de-atencion-al-cliente/preguntas-frecuentes/',
  'https://termogar.es/servicio-de-atencion-al-cliente/acceso-registro-clientes/',
  'https://termogar.es/servicio-de-atencion-al-cliente/catalogo-de-articulos/',
  'https://termogar.es/servicio-de-atencion-al-cliente/gestion-pedidos-como-comprar-consulta-modificaciones-cancelacion/',
  'https://termogar.es/servicio-de-atencion-al-cliente/pago-seguro/',
  'https://termogar.es/servicio-de-atencion-al-cliente/envio-y-entrega/',
  'https://termogar.es/servicio-de-atencion-al-cliente/acerca-de-termogar/'
]
