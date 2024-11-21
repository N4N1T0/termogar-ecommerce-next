import { Costumer } from '@/types/sanity'
import { WP_REST_API_Costumer } from '../../types'
import { isAddressEmpty } from '@/lib/utils'
import { uuid } from '@sanity/uuid'
import { SanityClient } from 'sanity'
import {
  sanityIdToImageReference,
  sanityUploadImageFromUrl
} from '../utils/wpImageFetch'
import { UploadClientConfig } from 'next-sanity'

// Remove these keys because they'll be created by Content Lake
export type StagedCostumer = Omit<
  Costumer,
  '_createdAt' | '_updatedAt' | '_rev'
>

export async function transformToCostumers(
  wpDoc: WP_REST_API_Costumer,
  client: SanityClient,
  existingImages: Record<string, string> = {}
): Promise<StagedCostumer> {
  const doc: StagedCostumer = {
    _id: `customer-${wpDoc.id}`,
    _type: 'costumer'
  }

  if (wpDoc.email) {
    doc.email = wpDoc.email
  }

  if (wpDoc.first_name) {
    doc.firstName = wpDoc.first_name
  }

  if (wpDoc.last_name) {
    doc.lastName = wpDoc.last_name
  }

  if (wpDoc.is_paying_customer) {
    doc.isPayingCustomer = wpDoc.is_paying_customer
  }

  if (wpDoc.username) {
    doc.userName = wpDoc.username
  }

  if (wpDoc.billing && isAddressEmpty(wpDoc.billing)) {
    doc.billingAddress = [
      {
        _type: 'address',
        _key: uuid(),
        address1: wpDoc.billing.address_1,
        address2: wpDoc.billing.address_2,
        city: wpDoc.billing.city,
        email: wpDoc.billing.email,
        state: wpDoc.billing.state,
        firstName: `${wpDoc.billing.first_name} ${wpDoc.billing.last_name}`,
        phone: wpDoc.billing.phone,
        postcode: wpDoc.billing.postcode
      }
    ]
  }

  if (wpDoc.shipping && isAddressEmpty(wpDoc.shipping)) {
    doc.shippingAddresses = [
      {
        _type: 'address',
        _key: uuid(),
        address1: wpDoc.shipping.address_1,
        address2: wpDoc.shipping.address_2,
        city: wpDoc.shipping.city,
        email: wpDoc.shipping.email,
        state: wpDoc.shipping.state,
        firstName: `${wpDoc.shipping.first_name} ${wpDoc.shipping.last_name}`,
        phone: wpDoc.shipping.phone,
        postcode: wpDoc.shipping.postcode
      }
    ]
  }

  if (wpDoc.avatar_url) {
    // Image exists already in dataset
    if (existingImages[wpDoc.avatar_url]) {
      doc.avatarUrl = sanityIdToImageReference(existingImages[wpDoc.avatar_url])
    } else {
      const metadata: UploadClientConfig = {
        filename: `wp-avatar-${wpDoc.id}`,
        source: {
          id: `wp-avatar-${wpDoc.id}`,
          name: 'Gravatar',
          url: wpDoc.avatar_url
        }
      }

      if (metadata?.source?.url) {
        // Upload to Sanity
        const asset = await sanityUploadImageFromUrl(
          metadata.source.url,
          client,
          metadata
        )

        if (asset) {
          doc.avatarUrl = sanityIdToImageReference(asset._id)
          existingImages[wpDoc.avatar_url] = asset._id
        }
      }
    }
  }

  return doc
}
