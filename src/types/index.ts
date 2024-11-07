//* SECTION STYLES
export interface SectionStyleOneProps {
  className?: string
  categoryTitle: string
  sectionTitle: string
  seeMoreUrl: string
  brands: string[]
  products: ProductTypes[]
  categoryBackground?: string
}

export interface SectionStyleTwoProps
  extends Omit<
    SectionStyleOneProps,
    | 'categoryTitle'
    | 'sectionTitle'
    | 'seeMoreUrl'
    | 'brands'
    | 'categoryBackground'
  > {}

export interface SectionStyleThreeProps
  extends Omit<
    SectionStyleOneProps,
    'categoryTitle' | 'brands' | 'categoryBackground'
  > {}

export interface SectionStyleFourProps
  extends Omit<
    SectionStyleOneProps,
    'categoryTitle' | 'brands' | 'categoryBackground'
  > {}

export interface ViewMoreTitleProps {
  categoryTitle: string
  className?: string
  children?: React.ReactNode
  seeMoreUrl: string
}

export interface CategoryCardProps {
  background?: string
  title: string
  brands: string[]
}

export interface ProductTypes {
  id: string
  image: string
  brand: string
  review: number
  title: string
  offer_price: string
  price: string
  campaingn_product: boolean
  cam_product_available: number | null
  cam_product_sale: number | null
  product_type: string | null
}

export interface DataIterationProps {
  datas: Array<any>
  startLength: number
  endLength: number
  children: ({ datas, index }: { datas: any; index: number }) => React.ReactNode
}

export interface BrandSectionProps {
  className?: string
  sectionTitle: string
}

export interface CampaignCountDownProps {
  className?: string
  lastDate: string
  counterbg?: string
  appscreen?: string
}

//* PRODUCT CARDS
export interface ProductCardStyleOneProps {
  datas: ProductTypes
}

export interface ProductCardRowStyleTwo extends ProductCardStyleOneProps {
  className?: string
}

export interface ProductCardRowStyleTwoProps extends ProductCardStyleOneProps {
  className?: string
}

export interface ProductsAdsProps {
  className: string
  ads: string[]
  sectionHeight: string
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
}

export interface PaginationBlogProps {
  currentPage: number
  totalPages: number
  lastId: string
  type: 'blog' | 'noticias'
}
