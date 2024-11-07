import { type SchemaTypeDefinition } from 'sanity'

//* TYPES
import { pageType } from './PageType'
import { authorType } from './AuthorType'
import { categoryType } from './CategoryType'
import { externalImageType } from './ExternalImageType'
import { postType } from './PostType'
import { tagType } from './TagType'
import { productType } from './ProductsType'
import { productCategoryType } from './ProductCategoryType'
import { productTagType } from './ProductTagType'
import { reviewType } from './ReviewType'

// TODO: Reviews, Client, Coupons

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageType,
    authorType,
    categoryType,
    externalImageType,
    postType,
    tagType,
    productType,
    productCategoryType,
    productTagType,
    reviewType
  ]
}
