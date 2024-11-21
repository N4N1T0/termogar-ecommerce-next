'use server'

import { PasswordSchema } from '@/lib/schemas'
import { hashPassword } from '@/lib/utils'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Costumer } from '@/types/sanity'

export default async function resetPassword(
  values: PasswordSchema & { id: string | undefined }
) {
  const password = values.password
  const confirmPassword = values.confirmPassword
  const id = values.id

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
}
