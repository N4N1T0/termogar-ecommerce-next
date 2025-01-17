// import { wcAPI } from '@/lib/clients'
// import { sanityClientWrite } from '@/sanity/lib/client'
// import { Product } from '@/types/sanity'
// import { WP_REST_API_Products } from '@migrations/import-wp/types'
// import { NextResponse } from 'next/server'

// const invalidProductsId = [21367]

// export const GET = async () => {
//   const totalPages = 26 // Número total de páginas

//   const existingProducts: Record<string, string>[] =
//     await sanityClientWrite.fetch(`*[_type == "product"]{_id}`)

//   try {
//     // Iterar sobre cada página
//     for (let page = 1; page <= totalPages; page++) {
//       console.log(`Procesando página: ${page}`)

//       // Obtén los productos desde WooCommerce para la página actual
//       const { data: products } = (await wcAPI.get('products', {
//         per_page: 10, // Cantidad de productos por página
//         page
//       })) as Record<string, WP_REST_API_Products>

//       // Procesa cada producto de la página actual
//       for (const product of products) {
//         if (invalidProductsId.includes(product.id)) {
//           console.log(`Producto inválido omitido: ${product.id}`)
//           continue
//         }

//         // Buscar el producto en Sanity
//         const fetchedProduct = (await sanityClientWrite.fetch(
//           `*[_type == "product" && _id == $id][0]`,
//           { id: `product-${product.id}` }
//         )) as Product

//         if (!fetchedProduct) {
//           console.error(`Producto no encontrado en Sanity: ${product.id}`)
//           continue
//         }

//         const options = product.attributes.find(
//           (attr) => attr.options.length > 0
//         )
//         const variations = product.variations

//         if (options) {
//           await sanityClientWrite
//             .patch(fetchedProduct._id)
//             .set({
//               options: {
//                 name: options.name,
//                 values: options.options.map((option, index) => {
//                   const productVariant = existingProducts.find(
//                     (existingProduct) =>
//                       existingProduct._id === `product-${variations[index]}`
//                   )
//                   return {
//                     value: option,
//                     reference: productVariant
//                       ? {
//                           _ref: productVariant._id,
//                           _type: 'reference'
//                         }
//                       : undefined
//                   }
//                 })
//               }
//             })
//             .commit({ autoGenerateArrayKeys: true })

//           console.log(`Procesado producto WITH OPTIONS: ${product.id}`)
//         }

//         console.log(`Procesado producto WITHOUT OPTIONS: ${product.id}`)
//       }
//     }

//     return NextResponse.json({ success: true, message: 'Done' })
//   } catch (error) {
//     console.error('Error en GET:', error)
//     return NextResponse.json({
//       success: false,
//       message: 'An error occurred',
//       error
//     })
//   }
// }
