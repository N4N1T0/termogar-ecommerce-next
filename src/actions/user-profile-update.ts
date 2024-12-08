'use server'

import { CostumerSchema, costumerSchema } from '@/lib/schemas'
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { AuthError } from 'next-auth'

const userProfileUpdate = async (
  values: CostumerSchema & { id: string | undefined; avatarUrl: string | null }
) => {
  const { id, avatarUrl, ...dataToValidate } = values

  try {
    const result = costumerSchema.safeParse(dataToValidate)

    if (!result.success) {
      return {
        success: false,
        message: 'Los datos no son Validos'
      }
    }

    const exitingEmail = await sanityClientWrite.fetch(GET_USER_FOR_AUTH, {
      email: dataToValidate.email
    })

    if (exitingEmail?.id === id) {
      return {
        success: false,
        message:
          'El correo electrónico ya existe, intenta con otro. si ya tiene una cuenta puede iniciar session en la pagina principal!'
      }
    }

    const base64Data = avatarUrl?.split(',')[1]
    const mimeType = avatarUrl?.split(',')[0]?.match(/:(.*?);/)?.[1]

    if (!base64Data || !mimeType) {
      return
    }

    const buffer = Buffer.from(base64Data, 'base64')

    const imageResponse = await sanityClientWrite.assets.upload(
      'image',
      buffer,
      {
        contentType: mimeType,
        filename: `${dataToValidate.email}.png`
      }
    )

    await sanityClientWrite
      .patch(id!)
      .set({
        avatarUrl: {
          _type: 'image',
          asset: {
            _ref: imageResponse._id,
            _type: 'reference'
          }
        },
        billingAddress: [
          {
            _key: 'billingAddress',
            address1: dataToValidate.billingAddress?.address1,
            address2: dataToValidate.billingAddress?.address2,
            city: dataToValidate.billingAddress?.city,
            email: dataToValidate.billingAddress?.email,
            firstName: dataToValidate.billingAddress?.firstName,
            phone: dataToValidate.billingAddress?.phone,
            postcode: dataToValidate.billingAddress?.postcode,
            state: dataToValidate.billingAddress?.state,
            _type: 'address'
          }
        ],
        email: dataToValidate.email,
        firstName: dataToValidate.firstName,
        lastName: dataToValidate.lastName,
        userName: dataToValidate.userName
      })
      .commit()

    return {
      success: true,
      message: 'Registro Exitoso'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: error.cause?.err?.message
      }
    }
    return {
      success: false,
      message: 'Ocurrió un error durante el inicio de sesión'
    }
  }
}

export default userProfileUpdate
