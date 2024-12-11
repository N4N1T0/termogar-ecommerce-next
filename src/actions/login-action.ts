'use server'

// * ASSETS IMPORTS
import { LoginSchema, loginSchema } from '@/lib/schemas'
import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { Logger } from 'next-axiom'

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

    const formData = new FormData()
    Object.entries(parsed.data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

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

const loginGoogleAction = async (
  e: FormData,
  url: string | string[] | undefined
) => {
  const redirectTo = Array.isArray(url) || url === undefined ? '/' : url
  await signIn('google', { redirectTo })
}

export { loginAction, logoutAction, loginGoogleAction }
