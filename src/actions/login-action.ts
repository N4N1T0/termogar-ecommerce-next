'use server'

import { LoginSchema, login } from '@/lib/schemas'
import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'

const loginAction = async (values: LoginSchema) => {
  try {
    const parsed = login.safeParse(values)

    if (!parsed.success) {
      return {
        success: false,
        message: 'Las credenciales no coinciden'
      }
    }

    await signIn('credentials', parsed.data)

    return {
      success: true,
      message: 'Redirigiendo a la pagina principal'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.cause?.err?.message)
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

const logoutAction = async () => {
  await signOut()
}

export { loginAction, logoutAction }
