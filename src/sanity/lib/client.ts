import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const sanityClientRead = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const sanityClientWrite = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
})
