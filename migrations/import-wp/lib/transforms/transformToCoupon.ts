import { Coupon } from '@/types/sanity'
import { WP_REST_API_Coupon } from '../../types'
import { uuid } from '@sanity/uuid'

// Remove these keys because they'll be created by Content Lake
export type StagedCoupon = Omit<Coupon, '_createdAt' | '_updatedAt' | '_rev'>

export const transformToCoupon = async (wpDoc: WP_REST_API_Coupon) => {
  const doc: StagedCoupon = {
    _id: `coupon-${wpDoc.id}`,
    _type: 'coupon'
  }

  if (wpDoc.code) {
    doc.code = wpDoc.code
  }

  if (wpDoc.amount) {
    doc.amount = wpDoc.amount
  }

  if (wpDoc.date_created) {
    doc.date_created = wpDoc.date_created
  }

  if (wpDoc.date_modified) {
    doc.date_modified = wpDoc.date_modified
  }

  if (wpDoc.discount_type) {
    doc.discount_type = wpDoc.discount_type as Coupon['discount_type']
  }

  if (wpDoc.description) {
    doc.description = wpDoc.description
  }

  if (wpDoc.date_expires) {
    doc.date_expires = wpDoc.date_expires
  }

  if (wpDoc.usage_count) {
    doc.usage_count = wpDoc.usage_count
  }

  if (wpDoc.usage_limit) {
    doc.usage_limit = wpDoc.usage_limit
  }

  if (wpDoc.usage_limit_per_user) {
    doc.usage_limit_per_user = wpDoc.usage_limit_per_user
  }

  if (wpDoc.limit_usage_to_x_items) {
    doc.limit_usage_to_x_items = wpDoc.limit_usage_to_x_items
  }

  if (
    Array.isArray(wpDoc.product_categories) &&
    wpDoc.product_categories.length > 0
  ) {
    doc.product_categories = wpDoc.product_categories.map((id) => ({
      _ref: `productCategory-${id}`,
      _type: 'reference',
      _key: uuid()
    }))
  }

  if (wpDoc.minimum_amount) {
    doc.minimum_amount = wpDoc.minimum_amount
  }

  if (wpDoc.maximum_amount) {
    doc.maximum_amount = wpDoc.maximum_amount
  }

  return doc
}
