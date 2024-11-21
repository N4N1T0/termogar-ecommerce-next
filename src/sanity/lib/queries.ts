import { defineQuery } from 'next-sanity'

// * MAIN PAGE
export const GET_MAIN_PAGE = defineQuery(`*[_type =='homePage'][0]{
 mainBanner[]{
    "url": image.asset->url,
    "blur": image.asset->metadata.lqip,
     "link": link.current
  },
  "mainCategory": mainCategory->{
  name,
  "slug": slug.current
  },
  "offer": offer{
    date,
    active,
    "media": {
      "url": banner.assets->url,
      "blur": banner.assets->metadata.lqip
    }
  },
    secondaryCategory->{
      name,
      "slug": slug.current
    },
    "ads": ads[]->{
  "media": {
    "url": asset->url,
    "blur": asset->metadata.lqip
  },
  "link": link.current
},
"tertiaryCategory": tertiaryCategory->{
  name,
  "slug": slug.current
  },
youtubeVideos[]{
      videoId,
      "id": _key,
      title
  }
}`)

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

export const GET_COSTUMER_SERVICES_SIDEBAR_MENU =
  defineQuery(`*[_type =='page' && status == 'publish']{
  "id": _id,
  "slug": slug.current,
  title,
  "link": link.current
}`)

export const GET_COSTUMER_SERVICES_PAGE =
  defineQuery(`*[_type =='page' && status == 'publish' && slug.current in $slug][0]{
  "id": _id,
  "slug": slug.current,
  title,
  "link": link.current,
  excerpt,
  content
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

export const GET_CARD_BLOG_POST_BY_TAGS =
  defineQuery(`*[_type =='post' && status == 'publish' && count((tags[]->slug.current)[@ in $slug]) > 0][0...24] | order(date desc) {
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

export const GET_CARD_BLOG_POST_BY_CATEGORIES =
  defineQuery(`*[_type =='post' && status == 'publish' && count((categories[]->slug.current)[@ in $slug]) > 0][0...24] | order(date desc) {
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

export const GET_LATEST_BLOG_POSTS_BY_CATEGORIES =
  defineQuery(`*[_type =='post' && status == 'publish' && count((categories[]->name)[@ in $type]) > 0][0...3] | order(date desc) {
    "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset -> url,
    "blur": featuredMedia.asset -> metadata.lqip
  },
    title,
    date,
    "slug": slug.current
  }`)

export const GET_BLOG_ARTICLE_BY_SLUG =
  defineQuery(`*[_type=='post' && status == 'publish' && slug.current == $slug][0]{
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
    "slug": slug.current,
    "count": count(*[_type == 'post' && status == 'publish' && references(^._id)])
  },
    title,
    date,
    content,
    tags[]->{
    name,
    "id": _id,
    "slug": slug.current,
    "count": count(*[_type == 'post' && status == 'publish' && references(^._id)])
  },
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
export const GET_BRANDS = defineQuery(`*[_type=='brand']{
  "id": _id,
  "slug": link.current,
  "media": {
    "url": image.asset->url,
    "blur": image.asset->metadata.lqip
  },
  title
}`)

export const GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && (title match $search || excerpt match $search)]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  dimensions,
  "stockQuantity": stock_quantity,
  options,
  date,
  "tags": productTags[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
}
}`)

export const GET_CARD_STYLE_ONE_PRODUCTS_BY_CATEGORY =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && count((productCategories[]->name)[@ in $type]) > 0]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  dimensions,
  "stockQuantity": stock_quantity,
  options,
  date,
  "tags": productTags[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
}
}`)

export const GET_COUPONS_FOR_VALIDATION =
  defineQuery(`*[_type=='coupon' && code == $code][0] {
   amount,
    date_expires,
    discount_type,
    limit_usage_to_x_items,
    maximum_amount,
    minimum_amount,
    "product_categories": product_categories[]->{
     "id": _id
    },
    "product_ids": product_ids[]->{
     "id": _id  
   },
    usage_limit,
    usage_count,
    usage_limit_per_user
}`)

// * USER QUERIES
export const GET_USER_INFO =
  defineQuery(`*[_type =='costumer' && _id == $id][0]{
  "id": _id,
  "active": isPayingCustomer,
  userName,
  lastName,
  firstName,
  password,
    email,
  "avatar": avatarUrl.asset->{
    "url": url,
    "blur": metadata.lqip
  },
 "billingAddress": billingAddress[0],
  shippingAddresses
}`)

// * STATICS AND ISR QUERIES
export const GET_STATIC_BLOG_OR_NEWS_SLUG =
  defineQuery(`*[_type =='post' && status == 'publish' && count((categories[]->name)[@ in $type]) > 0] | order(date desc) {
  "slug": slug.current
  }`)

export const GET_STATIC_TAGS_SLUGS =
  defineQuery(`*[_type =='tag'] | order(date desc) {
  "slug": slug.current
  }`)

export const GET_STATIC_CATEGORIES_SLUGS =
  defineQuery(`*[_type =='category'] | order(date desc) {
  "slug": slug.current
  }`)

export const GET_STATIC_COSTUMER_SERVICES_PAGES_SUG =
  defineQuery(`*[_type =='page' && status == 'publish']{
  "slug": slug.current,
}`)
