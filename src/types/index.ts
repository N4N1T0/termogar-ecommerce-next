import React from 'react'
import {
  Address,
  ExternalImage,
  GET_CARD_BLOG_POSTResult,
  GET_USER_INFOResult,
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot
} from './sanity'
import { Category } from '@/lib/utils'

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

export interface BrandSectionProps {
  className?: string
  sectionTitle: string
}

export interface CampaignCountDownProps {
  className?: string
  data?: {
    date: string | null
    active: boolean | null
    media: {
      url: null
      blur: null
    }
  } | null
}

export interface BlogCardProps {
  className?: string
  data: GET_CARD_BLOG_POSTResult[number]
  priority?: boolean
  type: 'news' | 'blog'
}

export interface RadiogroupFilterProps {
  categories: {
    id: string
    name: string | null
    slug: string | null
  }[]
  label: string
}

export interface BrandFilterProps {
  brands: {
    id: string
    title: string | null
    link: string | null
  }[]
}

export interface PriceRangeSliderProps {
  min: number
  max: number
  step?: number
}

//* PRODUCT CARDS
export interface ProductCardType {
  id: string
  sku: string | null
  brand: {
    title: string | null
    link: string | null
    featuredMedia: string | null
  } | null
  featuredMedia: {
    url: string | null
    blur: string | null
  } | null
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
  } | null
  options: {
    name?: string
    values?: string[]
  } | null
  date: string | null
  tags: { id: string; name: string | null; slug: string | null }[] | null
  otherImages: ({ url: string | null; blur: string | null } | null)[] | null
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

export interface GroupedCategory {
  main: Omit<Category, 'children'> // Main category without the `children` field
  children: Category[] // Array of child categories
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
  className?: string
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

export interface OrderData {
  user: GET_USER_INFOResult
  orderId: string | string[]
  newAddress: string | string[] | undefined
  gateway: string | string[] | undefined
  discountCoupon: string | string[] | undefined
}

export interface OrderDataNotificationsButtons {
  status: 'success' | 'failed'
  user: GET_USER_INFOResult
  newAddress: string | string[] | undefined
  products: CartItemType[]
  orderId: string | string[]
  total: number
  gateway: string | string[] | undefined
  iva: number
  refactoredCoupon: string[]
  refactoredShippingAddress: (Address & { _key: string }) | null | undefined
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
  created_at: string
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
