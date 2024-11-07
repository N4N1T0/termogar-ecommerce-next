import { defineQuery } from 'next-sanity'

// * MENU & HEADER QUERIES
export const GET_MENU_CATEGORIES =
  defineQuery(`*[_type=='productCategory' && main == true] | order(name asc){
  "id": _id,
  name, 
  description, 
  link, 
  "children": *[_type=='productCategory' && references(^._id)]
   {
      "id": _id,
    name, 
    link
   },
  "featuredImage": *[_type=='product' && references(^._id)][0]{
    "url":featuredMedia.asset->url,
      "blur":featuredMedia.asset->metadata.lqip
  }
  }`)

// * BLOG QUERIES
export const GET_CARD_BLOG_POST =
  defineQuery(`*[_type =='post' && status == 'publish' && count((categories[]->name)[@ in $type]) > 0][0...12] | order(date desc) {
    "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset -> url,
    "blur": featuredMedia.asset -> metadata.lqip
  },
  excerpt,
  author->{
    name,
    "avatar": {
      "url": avatar.asset -> url,
    "blur": avatar.asset -> metadata.lqip
    }
  },
  "slug": slug.current,
  categories[]->{
    name,
    "id": _id,
  },
    title,
    date
  }`)

export const GET_CARD_BLOG_POST_PAGINATION =
  defineQuery(`*[_type =='post' && status == 'publish' && count((categories[]->name)[@ in $type]) > 0 && _id > $lastId][0...12] | order(date desc) {
    "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset -> url,
    "blur": featuredMedia.asset -> metadata.lqip
  },
  excerpt,
  author->{
    name,
    "avatar": {
      "url": avatar.asset -> url,
    "blur": avatar.asset -> metadata.lqip
    }
  },
  "slug": slug.current,
  categories[]->{
    name,
    "id": _id,
  },
    title,
    date
  }`)

export const GET_TOTAL_BLOG_POST = defineQuery(
  `count(*[_type =='post' && status == 'publish' && count((categories[]->name)[@ in $type]) > 0])`
)

// * PRODUCTS QUERIES
export const GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH =
  defineQuery(`*[_type =='product' && status == 'publish' && price != null && count((categories[]->name)[@ in $category]) > 0 && title match $search || excerpt match $search] {
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
  excerpt,
  "categories": categories->{
    "id": _id,
    name,
    slug
  }
}`)
