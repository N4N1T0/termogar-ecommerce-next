'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { schema } from '@/sanity/schemaTypes'
import { structure } from '@/sanity/structure'
import {
  setParent,
  changeToVariant,
  duplicateProduct,
  makeCurrierTag
} from '@/sanity/actions'
import { esESLocale } from '@sanity/locale-es-es'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    esESLocale()
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'productVariant') {
        return [...prev, setParent(context)]
      }

      if (context.schemaType === 'product') {
        return [...prev, changeToVariant(context), duplicateProduct(context)]
      }

      if (context.schemaType === 'order') {
        return [...prev, makeCurrierTag(context)]
      }
      return prev
    }
  }
})
