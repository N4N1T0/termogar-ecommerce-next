import React from 'react'
import {
  ExternalImage,
  GET_CARD_BLOG_POSTResult,
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot
} from './sanity'

//* SECTION STYLES
export interface SectionStyleOneProps {
  className?: string
  seeMoreUrl: string | null | undefined
  sectionTitle: string | null | undefined
}

export type SectionStyleTwoProps = Omit<
  SectionStyleOneProps,
  'categoryTitle' | 'brands' | 'categoryBackground'
>

export type SectionStyleThreeProps = Omit<
  SectionStyleOneProps,
  'categoryTitle' | 'brands' | 'categoryBackground'
>

export type SectionStyleFourProps = Omit<
  SectionStyleOneProps,
  'categoryTitle' | 'brands' | 'categoryBackground'
> & {
  products: ProductCardType[]
}

export interface ViewMoreTitleProps {
  categoryTitle?: string | null | undefined
  className?: string
  children?: React.ReactNode
  seeMoreUrl?: string | null | undefined
}

export interface CategoryCardProps {
  background?: string
  childrenCategories: string[]
}

export interface DataIterationProps<T> {
  datas: Array<T>
  startLength: number
  endLength: number
  children: ({ datas, index }: { datas: T; index: number }) => React.ReactNode
}

export interface BrandSectionProps {
  className?: string
  sectionTitle: string
}

export interface CampaignCountDownProps {
  className?: string
  data?:
    | {
        date: string
        active: boolean
        media: {
          url: string
          blur: string
        }
      }
    | undefined
}

export interface BlogCardProps {
  className?: string
  data: GET_CARD_BLOG_POSTResult[number]
  priority?: boolean
  type: 'news' | 'blog'
}

//* PRODUCT CARDS
export interface ProductCardType {
  id: string
  featuredMedia: {
    url: string | null
    blur: string | null
  }
  title: string | null
  slug: string | null
  excerpt: string | null
  categories: Array<{
    id: string
    name: string | null
    slug: string | null
  }> | null
  content: Content | null
  price: number | null
  stockQuantity: number | null
  sale: {
    price?: number
    from?: string
    to?: string
  } | null
  dimensions: {
    length?: number
    width?: number
    height?: number
    weight?: number
    alt?: Content | null
  }
  options: {
    name?: string
    values?: string[]
  } | null
  date: string | null
  tags: null
  otherImages: {
    url: string | null
    blur: string | null
  }[]
}

export interface CartItemType extends ProductCardType {
  quantity: number
}

export interface ProductQuickViewProps {
  data: ProductCardType
}

export interface ProductCardStyleOneProps<T> {
  datas: T
  priority: boolean
}

export interface ProductCardRowStyleTwo<T> extends ProductCardStyleOneProps<T> {
  className?: string
}

export interface ProductCardRowStyleTwoProps<T>
  extends ProductCardStyleOneProps<T> {
  className?: string
}

export interface BlogSideBarProps {
  categories:
    | {
        name: string | null
        id: string
        slug: string | null
        count: number
      }[]
    | null
  tags:
    | {
        name: string | null
        id: string
        slug: string | null
        count: number
      }[]
    | null
  type: 'news' | 'blog'
}

export interface ProductsAdsProps {
  className: string
  ads?: {
    media: {
      url: string
      blur: string
    }
    link: string
  }[]
}

export interface PageTitleProps {
  title: string
  subTitle?: string | undefined | null
  breadcrumb: BreadcrumbProps[]
}

export interface BreadcrumbProps {
  name: string
  path: string
}

export interface InputComProps {
  label?: string
  type: string
  name?: string
  placeholder: string
  children?: React.ReactNode
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  inputClasses?: string
  labelClasses?: string
  isPending?: boolean
}

export interface PaginationBlogProps {
  currentPage: number
  totalPages: number
  lastId: string
  type: 'blog' | 'noticias'
}

// * PRODUCTS
// Span type for text elements
interface Span {
  marks?: Array<string>
  text?: string
  _type: 'span'
  _key: string
}

// Block type for rich text blocks
interface Block {
  children?: Array<Span>
  style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal'
  listItem?: 'bullet' | 'number'
  markDefs?: Array<LinkMarkDef>
  level?: number
  _type: 'block'
  _key: string
}

// Mark definition for links within text blocks
interface LinkMarkDef {
  href?: string
  _type: 'link'
  _key: string
}

// Sanity image reference type
interface ImageAssetReference {
  _ref: string
  _type: 'reference'
  _weak?: boolean
  [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
}

// Image block type for Sanity images
interface ImageBlock {
  asset?: ImageAssetReference
  hotspot?: SanityImageHotspot
  crop?: SanityImageCrop
  _type: 'image'
  _key: string
}

// Define the main Content type as an array of the above types
export type Content = Array<ContentItem>

// Union type for different content items within the Content array
type ContentItem = ({ _key: string } & ExternalImage) | Block | ImageBlock

// * STORES TYPES
export interface CompareProductsState {
  products: ProductCardType[]
  addProduct: (newProduct: ProductCardType) => void
  removeProduct: (id: string) => void
  removeAllProducts: () => void
  rehydrated: boolean
  hasHydrated: () => void
}

export interface CartState {
  products: CartItemType[]
  addProduct: (newProduct: CartItemType) => void
  removeProduct: (id: string) => void
  removeAllProducts: () => void
  rehydrated: boolean
  hasHydrated: () => void
  updateProductQuantity: (id: string, quantity: number) => void
}

export interface WishlistState {
  products: ProductCardType[]
  addProduct: (newProduct: ProductCardType) => void
  removeProduct: (id: string) => void
  removeAllProducts: () => void
  rehydrated: boolean
  hasHydrated: () => void
}

// * CUSTOMS
export interface YoptopReview {
  id: number
  score: number
  votes_up: number
  votes_down: number
  content: string
  title: string
  sentiment: null
  created_at: Date
  deleted: boolean
  verified_buyer: boolean
  source_review_id: null
  custom_fields: null
  product_id: number
  is_incentivized: boolean
  incentive_type: null
  images_data: null
  comment: null
  user: YoptopReviewsUser
}

export interface YoptopReviewsUser {
  user_id: number
  social_image: null
  user_type: string
  is_social_connected: number
  display_name: string
}

export type YoptopReviews = YoptopReview[]
