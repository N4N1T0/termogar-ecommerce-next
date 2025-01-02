/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  WP_REST_API_Categories,
  WP_REST_API_Pages,
  WP_REST_API_Posts,
  WP_REST_API_Tags,
  WP_REST_API_Term,
  WP_REST_API_Users
} from 'wp-types'

export type WordPressDataType =
  | 'categories'
  | 'posts'
  | 'pages'
  | 'tags'
  | 'users'
  | 'products'
  | 'product_cat'
  | 'product_tag'
  | 'coupons'
  | 'customers'

export type WordPressDataTypeResponses = {
  categories: WP_REST_API_Categories
  posts: WP_REST_API_Posts
  pages: WP_REST_API_Pages
  tags: WP_REST_API_Tags
  users: WP_REST_API_Users
  products: WP_REST_API_Products
  product_cat: WP_REST_API_Term
  product_tag: WP_REST_API_Term
  coupons: WP_REST_API_Coupons
  customers: WP_REST_API_Costumers
}

export type SanitySchemaType =
  | 'category'
  | 'post'
  | 'page'
  | 'tag'
  | 'author'
  | 'product'
  | 'productCategory'
  | 'productTag'
  | 'coupon'
  | 'customers'

// * CUSTOM TYPES
export type WP_REST_API_Product = {
  id: number
  sku: string
  date_created: string
  date_modified: string
  permalink: string
  regular_price: string
  price: string
  slug: string
  status: 'publish' | 'draft' | 'pending' | 'private'
  type: string
  link: string
  name: string
  stockQuantity: number
  sale_price: string
  date_on_sale_from: string
  date_on_sale_to: string
  downloads: string[]
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  attributes: {
    id: number
    name: string
    slug: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }[]
  description: string
  variations: number[]
  images: {
    id: number
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    src: string
    name: string
    alt: string
  }[]
  comment_status: 'open' | 'closed'
  ping_status: 'open' | 'closed'
  template: string
  meta_data: { id: number; key: string; value: any }[]
  categories: {
    id: number
    name: string
    slug: string
  }[]
  tags: {
    id: number
    name: string
    slug: string
  }[]
  related_ids: number[]
}

export type WP_REST_API_Coupon = {
  id: number
  code: string
  amount: string
  status: string
  date_created: string
  date_created_gmt: Date
  date_modified: string
  date_modified_gmt: Date
  discount_type: string
  description: string
  date_expires: null
  date_expires_gmt: null
  usage_count: number
  individual_use: boolean
  product_ids: any[]
  excluded_product_ids: any[]
  usage_limit: null
  usage_limit_per_user: null
  limit_usage_to_x_items: null
  free_shipping: boolean
  product_categories: any[]
  excluded_product_categories: any[]
  exclude_sale_items: boolean
  minimum_amount: string
  maximum_amount: string
  email_restrictions: any[]
  used_by: any[]
  meta_data: any[]
}

export type WP_REST_API_Coupons = WP_REST_API_Coupon[]

export type WP_REST_API_Products = WP_REST_API_Product[]

export type WP_REST_API_Costumer = {
  id: number
  date_created: Date
  date_created_gmt: Date
  date_modified: null
  date_modified_gmt: null
  email: string
  first_name: string
  last_name: string
  role: string
  username: string
  billing: Ing
  shipping: Ing
  is_paying_customer: boolean
  avatar_url: string
  meta_data: MetaDatum[]
  _links: Links
}

export type Links = {
  self: Collection[]
  collection: Collection[]
}

export type Collection = {
  href: string
}

export type Ing = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  postcode: string
  country: string
  state: string
  email?: string
  phone: string
}

export type MetaDatum = {
  id: number
  key: string
  value: string
}

export type WP_REST_API_Costumers = WP_REST_API_Costumer[]
