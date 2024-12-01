'use server'

import { PasswordSchema } from '@/lib/schemas'
import { hashPassword } from '@/lib/utils'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Costumer } from '@/types/sanity'
import { AuthError } from 'next-auth'

const resetPassword = async (
  values: PasswordSchema & { id: string | undefined }
) => {
  const password = values.password
  const confirmPassword = values.confirmPassword
  const id = values.id

  try {
    if (!password || !confirmPassword || !id) {
      return {
        success: false,
        message: 'Faltan valores'
      }
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'Las contraseñas no coinciden.'
      }
    }

    const hashedPassword = hashPassword(password)

    const response: Costumer = await sanityClientWrite
      .patch(id)
      .set({ password: hashedPassword })
      .commit()

    if (!response) {
      return {
        success: false,
        message: 'Hubo un problema inesperado, Trate mas tarde'
      }
    }

    return {
      success: true,
      message: 'Contraseña cambiada con éxito.'
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

export default resetPassword
