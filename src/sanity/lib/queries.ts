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
  "slug": slug.current, 
  "children": *[_type=='productCategory' && references(^._id)]
   {
      "id": _id,
    name, 
    "slug": slug.current, 
   },
  "featuredImage": *[_type=='product' && references(^._id)][0]{
    "url":featuredMedia.asset->url,
      "blur":featuredMedia.asset->metadata.lqip
  }
  }`)

export const GET_ALL_TAGS =
  defineQuery(`*[_type=='productTag'] | order(name asc){
  "id": _id,
  name,
"slug": slug.current
}`)

export const GET_COSTUMER_SERVICES_SIDEBAR_MENU =
  defineQuery(`*[_type =='page' && status == 'publish']{
  "id": _id,
  "slug": slug.current,
  "link": link.current,
  title,
}`)

export const GET_COSTUMER_SERVICES_PAGE =
  defineQuery(`*[_type =='page' && status == 'publish' && slug.current in $slug][0]{
  title,
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

export const GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITH_CATEGORY =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && (title match $search || excerpt match $search) && count((productCategories[]->slug.current)[@ in $category]) > 0]{
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
  "brand": *[_type == 'brand' && ^.title match title] {
    title
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}`)

export const GET_CARD_STYLE_ONE_PRODUCTS_FOR_ERROR_NOTIFICATION =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && _id in $ids]{
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
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}`)

export const GET_CARD_STYLE_ONE_PRODUCTS_BY_SEARCH_WITHOUT_CATEGORY =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && (title match $search || excerpt match $search)]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
  "brand": *[_type == 'brand' && ^.title match title] {
    title
  },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
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
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}`)

export const GET_CARD_STYLE_ONE_PRODUCTS_BY_IDS =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && _id in $ids][0...4]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}`)

export const GET_BRANDS_AND_PRODUCTS =
  defineQuery(`*[_type=='brand' && link.current == $slug][0]{
  title, 
  "banner": *[_type =='homePage'][0]{
      "url": productListBanner.banner.asset->url,
      "blur": productListBanner.banner.asset->metadata.lqip,
      "link": productListBanner.link
  },
  "products": *[_type=='product' && status=='publish' && defined(price) && title match ^.title]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
  "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}
  }`)

export const GET_PRODUCTS_AND_BRAND_FOR_FILTERING =
  defineQuery(`*[_type=='brand' && link.current == $slug][0] {
  "products": *[_type=='product' && status=='publish' && defined(price) && title match ^.title]{
     "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current,
    main,
    "children": *[_type=='productCategory' && references(^._id)]
   {
      "id": _id,
    name, 
    "slug": slug.current, 
   },
  },
    price,
  }
  }`)

export const GET_CATEGORY_AND_PRODUCTS =
  defineQuery(`*[_type=='productCategory' && slug.current == $slug][0]{
  name, 
  description,
  "banner": *[_type =='homePage'][0]{
      "url": productListBanner.banner.asset->url,
      "blur": productListBanner.banner.asset->metadata.lqip,
      "link": productListBanner.link
  },
  "children": *[_type=='productCategory' && references(^._id)]
   {
    "id": _id,
    name, 
    link
   },
  "products": *[_type=='product' && status=='publish' && defined(price) && references(^._id)]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}
  }`)

export const GET_PRODUCTS_BY_OFFER = defineQuery(`{
  "banner": *[_type =='homePage'][0]{
      "url": productListBanner.banner.asset->url,
      "blur": productListBanner.banner.asset->metadata.lqip,
      "link": productListBanner.link
  },
   "offer": *[_type =='homePage'][0]{
    "date": offer.date,
    "active": offer.active,
    "media": {
      "url": offer.banner.assets->url,
      "blur": offer.banner.assets->metadata.lqip
    }
  },
  "products": *[_type=='product' && status=='publish' && defined(sale)][0...24]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}}`)

export const GET_PRODUCTS_WITH_OFFER_FOR_FILTERING = defineQuery(`{
  "products": *[_type=='product' && status=='publish' && defined(sale)][0...24]{
     "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current,
    main,
    "children": *[_type=='productCategory' && references(^._id)]
   {
      "id": _id,
    name, 
    "slug": slug.current, 
   },
  },
    price,
    "brand": *[_type == 'brand' && ^.title match title][0] {
      "id": _id,
      title,
      "link": link.current
    },
  }
  }`)

export const GET_PRODUCTS_AND_CATEGORIES_FOR_FILTERING =
  defineQuery(`*[_type=='productCategory' && slug.current == $slug][0] {
  "children": *[_type=='productCategory' && references(^._id)]
   {
      "id": _id,
    name, 
    "slug": slug.current, 
   },
  "products": *[_type=='product' && status=='publish' && defined(price) && references(^._id)]{
     "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current,
  },
    price,
    "brand": *[_type == 'brand' && ^.title match title][0] {
      "id": _id,
      title,
      "link": link.current
    },
  }
  }`)

export const GET_TAG_AND_PRODUCTS =
  defineQuery(`*[_type=='productTag' && slug.current == $slug][0]{
  name, 
  "banner": *[_type =='homePage'][0]{
      "url": productListBanner.banner.asset->url,
      "blur": productListBanner.banner.asset->metadata.lqip,
      "link": productListBanner.link
  },
  "products": *[_type=='product' && status=='publish' && defined(price) && references(^._id)]{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
}
  }`)

export const GET_WHOLE_PRODUCT_BY_SLUG =
  defineQuery(`*[_type=='product' && status=='publish' && defined(price) && slug.current == $slug][0]{
  "id": _id,
  sku,
  ean,
  referenceCode,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current,
    main
  },
  content,
  price,
  sale,
  createdAt,
  dimensions,
  "stockQuantity": stock_quantity,
  options,
  date,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"downloads": downloads.asset->{
    title,
    url
  },
variations,
"relatedProducts": relatedProducts[]->{
  "id": _id,
},
"hasLastMinute": defined(lastMinute)
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

export const GET_LAST_MINUTE_PRODUCTS_FROM_ID =
  defineQuery(`*[_type=='product' && status=='publish' && _id == $id][0]{
    "products": lastMinute.products[]->{
  "id": _id,
  "featuredMedia": {
    "url": featuredMedia.asset->url,
      "blur": featuredMedia.asset->metadata.lqip
  },
  title,
  "slug": slug.current,
 "brand": *[_type == 'brand' && ^.title match title][0] {
      title,
      "link": link.current,
      "featuredMedia": image.asset->url,
    },
  excerpt,
  "categories": productCategories[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
  content,
  price,
  sale,
  "stockQuantity": stock_quantity,
  "tags": productTag[]->{
    "id": _id,
    name,
    "slug": slug.current
  },
 "otherImages": relatedImages[].asset->{
  "url": url,
  "blur": metadata.lqip
},
"hasLastMinute": defined(lastMinute)
},
"time": lastMinute.time,
 "discount": lastMinute.discount,
  }`)

// * USER QUERIES
export const GET_USER_INFO =
  defineQuery(`*[_type == 'costumer' && _id == $id][0]{
  "id": _id,
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
  "shippingAddresses": shippingAddresses | order(createdAt desc)
}
`)

export const GET_USER_FOR_AUTH =
  defineQuery(`*[_type =='costumer' && email == $email][0]{
  "id": _id,
   userName,
  lastName,
  firstName,
  password,
    email,
   "avatar": avatarUrl.asset->{
    "url": url,
  },
}`)

export const GET_ORDERS_BY_USER_ID =
  defineQuery(`*[_type =='order' && userEmail._ref == $id ]{
  "id": _id,
  purchaseDate,
  currierCode,
  status,
  expectedDeliveryDate,
  paymentMethod,
  "shippingAddress": shippingAddress[0],
  totalAmount,
  products[]{
      product-> {
        "id": _id,
        title,
        price,
        "featuredMedia": {
          "url": featuredMedia.asset->url,
            "blur": featuredMedia.asset->metadata.lqip
        },
        sale
      },
      quantity
    }
}`)
