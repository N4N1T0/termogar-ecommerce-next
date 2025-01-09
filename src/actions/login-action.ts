'use server'

// * ASSETS IMPORTS
import { LoginSchema, loginSchema } from '@/lib/schemas'
import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { Logger } from 'next-axiom'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { verifyPassword } from '@/lib/utils'

const log = new Logger()

const loginAction = async (values: LoginSchema) => {
  try {
    const parsed = loginSchema.safeParse(values)

    if (!parsed.success) {
      log.error('Las credenciales no coinciden')
      return {
        success: false,
        message: 'Las credenciales no coinciden'
      }
    }

    const searchedUser = await sanityClientRead.fetch(GET_USER_FOR_AUTH, {
      email: parsed.data.email
    })

    if (!searchedUser) {
      log.error('El usuario no se ha encontrado')
      return {
        success: false,
        message: 'El usuario no se ha encontrado'
      }
    }

    const isVerified = verifyPassword(
      parsed.data.password,
      searchedUser?.password as string
    )

    if (!isVerified) {
      log.error('La contraseña no coincide')
      return {
        success: false,
        message: 'La contraseña no coincide'
      }
    }

    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false
    })

    return {
      success: true,
      message: 'Redirigiendo a la pagina principal'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      log.error(
        error.cause?.err?.message ||
          'Ocurrido un error durante el inicio de sesión'
      )
      return {
        success: false,
        message: error.cause?.err?.message
      }
    }
    log.error('Ocurrió un error durante el inicio de sesión')
    return {
      success: false,
      message: 'Ocurrió un error durante el inicio de sesión'
    }
  }
}

const logoutAction = async () => {
  await signOut()
}

const loginGoogleAction = async (url: string | string[] | undefined) => {
  const redirectTo = Array.isArray(url) || url === undefined ? '/' : url
  await signIn('google', { redirectTo })
}

export { loginAction, logoutAction, loginGoogleAction }
