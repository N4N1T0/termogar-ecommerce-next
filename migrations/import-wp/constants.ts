import type { SanitySchemaType, WordPressDataType } from './types'

export const BASE_URL = `https://termogar.es/wp-json/wc/v3`
export const PER_PAGE = 5
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
  product_tag: 'productTag'
}
