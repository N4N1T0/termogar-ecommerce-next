'use server'

// * ASSETS IMPORTS
import { userProfileSchema, UserProfileSchema } from '@/lib/schemas'
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { Address, Costumer } from '@/types/sanity'
import { AuthError } from 'next-auth'
import { Logger } from 'next-axiom'

const log = new Logger()

const uploadImageToSanity = async (avatarUrl: string, email: string) => {
  try {
    const base64Data = avatarUrl.split(',')[1]
    const mimeType = avatarUrl.match(/:(.*?);/)?.[1]

    if (!base64Data || !mimeType) {
      throw new Error('Invalid image format or missing data')
    }

    const buffer = Buffer.from(base64Data, 'base64')

    const imageResponse = await sanityClientWrite.assets.upload(
      'image',
      buffer,
      {
        contentType: mimeType,
        filename: `${email}.png`
      }
    )

    return {
      _type: 'image' as const,
      asset: { _ref: imageResponse._id, _type: 'reference' as const }
    }
  } catch (error) {
    log.error('Image upload failed', { error })
    throw new Error('Error uploading image')
  }
}

const getBillingAddressObject = (billingAddress: Partial<Address>) => ({
  _key: 'billingAddress',
  _type: 'address' as const,
  ...billingAddress
})

const userProfileUpdate = async (
  values: UserProfileSchema & { id?: string; avatarUrl?: string | null },
  isEmailDirty: boolean
) => {
  try {
    const { id, avatarUrl, ...dataToValidate } = values
    if (!id) throw new Error('User ID is required')

    // Validate data
    const result = userProfileSchema.safeParse(dataToValidate)
    if (!result.success) {
      log.error('Validation failed', { error: result.error.issues })
      return { success: false, message: 'Los datos no son válidos' }
    }

    // Check if email is already in use
    if (isEmailDirty) {
      const existingUser = await sanityClientWrite.fetch(GET_USER_FOR_AUTH, {
        email: dataToValidate.email
      })
      if (existingUser?.id === id) {
        log.info('Email already exists', { email: dataToValidate.email })
        return { success: false, message: 'El correo ya está en uso' }
      }
    }

    // Prepare update payload
    const updateData: Partial<Costumer> = {
      billingAddress: [getBillingAddressObject(dataToValidate.billingAddress)],
      email: dataToValidate.email,
      firstName: dataToValidate.firstName,
      lastName: dataToValidate.lastName,
      userName: dataToValidate.userName,
      IdDocument: dataToValidate.IdDocument,
      companyName: dataToValidate.companyName
    }

    // Upload image if provided
    if (avatarUrl) {
      updateData.avatarUrl = await uploadImageToSanity(
        avatarUrl,
        dataToValidate.email as string
      )
    }

    // Commit update
    await sanityClientWrite.patch(id).set(updateData).commit()

    log.info('User profile updated successfully', { id })
    return { success: true, message: 'Registro exitoso' }
  } catch (error) {
    log.error('Error during profile update', { error })
    if (error instanceof AuthError) {
      return { success: false, message: error.cause?.err?.message }
    }
    return {
      success: false,
      message: 'Ocurrió un error al actualizar el perfil'
    }
  }
}

export default userProfileUpdate
