/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

// * ASSETS IMPORTS
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_NOTIFY_ME } from '@/sanity/lib/queries'
import { uuid } from '@sanity/uuid'

const notifyMe = async ({ email, id }: { email: string; id: string }) => {
  if (!email || !id) {
    return {
      message: 'El correo electrónico y el id del producto son obligatorios.',
      success: false
    }
  }

  try {
    // Fetch the existing user document by email
    const alreadyNotified = await sanityClientWrite.fetch(GET_NOTIFY_ME, {
      email
    })

    if (alreadyNotified) {
      // Check if the product id is already in the list of notified products
      const productAlreadyNotified = alreadyNotified.products?.some(
        (product: { _id: string }) => product._id === id
      )

      if (productAlreadyNotified) {
        return {
          message: 'Ya estas notificado, no te preocupes',
          success: false
        }
      } else {
        // Append new product reference if not already notified
        await sanityClientWrite
          .patch(alreadyNotified.id)
          .setIfMissing({ products: [] }) // Ensure products array exists
          .append('products', [{ _type: 'reference', _ref: id }])
          .commit({ autoGenerateArrayKeys: true })

        return {
          message: 'Notificación de producto agregada',
          success: true
        }
      }
    } else {
      // If the user document doesn't exist, create one
      await sanityClientWrite.create({
        _type: 'noStockNotifyMe',
        email,
        products: [{ _type: 'reference', _ref: id, _key: uuid() }]
      })

      return {
        message: 'Notificación de producto creada',
        success: true
      }
    }
  } catch (error: any) {
    // Handle potential errors with a meaningful message
    return {
      message: 'Hubo un error al procesar la solicitud.',
      success: false,
      error: (error.message as string) || 'Unknown error'
    }
  }
}

export default notifyMe
