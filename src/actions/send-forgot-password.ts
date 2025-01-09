'use server'

import SendForgotPassword from '@/emails/send-forget-password'
import { resend } from '@/lib/clients'
import { generateSecurityToken } from '@/lib/utils'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { AuthError } from 'next-auth'

const sendForgetPassword = async (email: string) => {
  try {
    const user = await sanityClientRead.fetch(GET_USER_FOR_AUTH, { email })

    if (!user) {
      return {
        success: false,
        message: 'El usuario no se ha encontrado'
      }
    }

    const secretKey = process.env.SECRET_KEY!

    const token = generateSecurityToken(user.id, secretKey)

    const emailSent = resend.emails.send({
      from: 'recuperar-contrasena@termogar.es',
      to: [user.email as string],
      subject: 'Recuperar contraseña',
      react: SendForgotPassword({
        token,
        name: `${user.firstName} ${user.lastName}`
      })
    })

    if (!emailSent) {
      return {
        success: false,
        message: 'Ocurrió un error al enviar el correo'
      }
    }

    return {
      success: true,
      message: 'Correo enviado con éxito, por favor revisa su correo'
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

export default sendForgetPassword
