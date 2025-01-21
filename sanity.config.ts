'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { schema } from '@/sanity/schemaTypes'
import { structure } from '@/sanity/structure'
import { setParent } from '@/sanity/actions'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion })
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'productVariant') {
        return [...prev, setParent(context)]
      }
      return prev
    }
  }
})
