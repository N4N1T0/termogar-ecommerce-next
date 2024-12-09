'use server'

// * ASSETS IMPORTS
import { SignupSchema, signupSchema } from '@/lib/schemas'
import { AuthError } from 'next-auth'
import { uuid } from '@sanity/uuid'

// * UTILS IMPORTS
import { sanityClientWrite } from '@/sanity/lib/client'
import { hashPassword } from '@/lib/utils'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { Costumer } from '@/types/sanity'
import { signIn } from '@/lib/auth'
import { resend } from '@/lib/clients'
import NewUser from '@/emails/new-user'

const signupAction = async (values: SignupSchema) => {
  try {
    const parsed = signupSchema.safeParse(values)

    if (!parsed.success) {
      return {
        success: false,
        message: 'Las credenciales no coinciden'
      }
    }

    const existingUser = await sanityClientWrite.fetch(GET_USER_FOR_AUTH, {
      email: parsed.data.email
    })

    if (existingUser) {
      return {
        success: false,
        message:
          'Ya tienes una cuenta con nosotros, puedes iniciar session en la pagina principal!'
      }
    }

    const id = uuid()
    const hashedPassword = hashPassword(parsed.data.password!)

    await sanityClientWrite.createIfNotExists<Costumer>({
      _type: 'costumer',
      _id: `customer-${id}`,
      email: parsed.data.email,
      password: hashedPassword,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: id,
      avatarUrl: {
        _type: 'image',
        asset: {
          _ref: 'image-286ad6fa76db0d586ebaa65391a382a49bc163a3-96x96-jpg',
          _type: 'reference'
        }
      }
    })

    // TODO: Change the email address
    await resend.emails.send({
      from: 'usario-nuevo@termogar.es',
      bcc: ['adrian.alvarezalonso1991@gmail.com'],
      to: ['adrian.alvarezalonso1991@gmail.com'],
      subject: 'Nuevo Usuario',
      react: NewUser({
        email: parsed.data.email,
        registrationDate: new Date().toISOString(),
        link: `${process.env.NEXT_PUBLIC_SITE_URL}/studio/structure/comercio;costumer;${id}`
      })
    })

    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false
    })

    return {
      success: true,
      message: 'Registro Completo, Redirigiendo a la pagina principal'
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

export default signupAction
