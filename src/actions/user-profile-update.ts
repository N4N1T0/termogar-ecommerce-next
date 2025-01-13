'use server'

// * ASSETS IMPORTS
import { userProfileSchema, UserProfileSchema } from '@/lib/schemas'
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { AuthError } from 'next-auth'
import { Logger } from 'next-axiom'

const log = new Logger()

const userProfileUpdate = async (
  values: UserProfileSchema & {
    id: string | undefined
    avatarUrl: string | null
  },
  isEmailDirty: boolean
) => {
  const { id, avatarUrl, ...dataToValidate } = values

  try {
    const result = userProfileSchema.safeParse(dataToValidate)

    if (!result.success) {
      log.error('Validation failed', { error: result.error.issues })
      return {
        success: false,
        message: 'Los datos no son Validos'
      }
    }

    if (isEmailDirty) {
      const exitingEmail = await sanityClientWrite.fetch(GET_USER_FOR_AUTH, {
        email: dataToValidate.email
      })

      if (exitingEmail?.id === id) {
        log.info('Email already exists', { email: dataToValidate.email })
        return {
          success: false,
          message:
            'El correo electrónico ya existe, intenta con otro. si ya tiene una cuenta puede iniciar session en la pagina principal!'
        }
      }
    }

    if (avatarUrl) {
      const base64Data = avatarUrl?.split(',')[1]
      const mimeType = avatarUrl?.split(',')[0]?.match(/:(.*?);/)?.[1]

      if (!base64Data || !mimeType) {
        log.error('Invalid image format or missing image data')
        return {
          success: false,
          message:
            'El formato de la imagen es inválido o no se proporcionó una imagen válida.'
        }
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
    }

    await sanityClientWrite
      .patch(id!)
      .set({
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

    log.info('User profile updated successfully', { id })
    return {
      success: true,
      message: 'Registro Exitoso'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      log.error('Auth error during profile update', { error: error.cause?.err })
      return {
        success: false,
        message: error.cause?.err?.message
      }
    }
    log.error('Unexpected error during profile update', { error })
    return {
      success: false,
      message: 'Ocurrió un error durante el inicio de sesión'
    }
  }
}

export default userProfileUpdate
