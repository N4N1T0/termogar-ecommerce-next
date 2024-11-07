'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// import {
//   sanityCommerce,
//   SanityCommercePluginConfig
// } from '@commercelayer/sanity-plugin-commerce'

// const sanityCommerceConfig: SanityCommercePluginConfig = {
//   productLabel: 'Nombre del Producto',
//   variantLabel: 'Variante de',
//   taxonomyLabel: 'Category System',
//   taxonLabel: 'Category',
//   productAttributes: [{ name: 'origin', title: 'Origin', type: 'string' }]
// }

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion })
    // sanityCommerce(sanityCommerceConfig)
  ]
})
