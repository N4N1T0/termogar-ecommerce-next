'use server'

import { PasswordSchema } from '@/lib/schemas'
import { hashPassword } from '@/lib/utils'
import { sanityClientWrite } from '@/sanity/lib/client'
import { Costumer } from '@/types/sanity'
import { AuthError } from 'next-auth'
import { Logger } from 'next-axiom'

const log = new Logger()

const resetPassword = async (
  values: PasswordSchema & { id: string | undefined }
) => {
  const password = values.password
  const confirmPassword = values.confirmPassword
  const id = values.id

  try {
    if (!password || !confirmPassword || !id) {
      log.error('Faltan valores', {
        id,
        password,
        confirmPassword
      })
      return {
        success: false,
        message: 'Faltan valores'
      }
    }

    if (password !== confirmPassword) {
      log.error('Las contraseñas no coinciden.', {
        password,
        confirmPassword
      })
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
      log.error('Hubo un problema inesperado, Trate mas tarde', {
        id,
        password,
        confirmPassword
      })
      return {
        success: false,
        message: 'Hubo un problema inesperado, Trate mas tarde'
      }
    }

    log.info('Contraseña cambiada con éxito.', {
      id,
      password,
      confirmPassword
    })
    return {
      success: true,
      message: 'Contraseña cambiada con éxito.'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      log.error(error.cause?.err?.message || 'Hubo un error', {
        id,
        password,
        confirmPassword
      })
      return {
        success: false,
        message: error.cause?.err?.message
      }
    }
    log.error('Ocurrió un error durante el inicio de sesión', {
      id,
      password,
      confirmPassword
    })
    return {
      success: false,
      message: 'Ocurrió un error durante el inicio de sesión'
    }
  }
}

export default resetPassword
