import { NumberDiff } from 'sanity'
import type {
  WP_REST_API_Categories,
  WP_REST_API_Pages,
  WP_REST_API_Posts,
  WP_REST_API_Tags,
  WP_REST_API_Term,
  WP_REST_API_Users
} from 'wp-types'

export type WP_REST_API_Product = {
  id: number
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

export type WP_REST_API_Products = WP_REST_API_Product[]

export type WordPressDataType =
  | 'categories'
  | 'posts'
  | 'pages'
  | 'tags'
  | 'users'
  | 'products'
  | 'product_cat'
  | 'product_tag'

export type WordPressDataTypeResponses = {
  categories: WP_REST_API_Categories
  posts: WP_REST_API_Posts
  pages: WP_REST_API_Pages
  tags: WP_REST_API_Tags
  users: WP_REST_API_Users
  products: WP_REST_API_Products
  product_cat: WP_REST_API_Term
  product_tag: WP_REST_API_Term
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
