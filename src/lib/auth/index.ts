// * NEXTAUTH
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// * UTILS IMPORTS
import { verifyPassword } from '@/lib/utils'
import { sanityClientWrite } from '@/sanity/lib/client'
import { GET_USER_FOR_AUTH } from '@/sanity/lib/queries'
import { loginSchema } from '@/lib/schemas'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
          autocomplete: 'email',
          srcLang: 'es'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          required: true,
          autocomplete: 'current-password',
          srcLang: 'es'
        }
      },
      authorize: async (credentials) => {
        const { email, password } = await loginSchema.parseAsync(credentials)

        const user = await sanityClientWrite.fetch(GET_USER_FOR_AUTH, { email })

        if (!user || !user?.password) {
          throw new Error('El usuario no se ha encontrado.')
        }

        const isVerified = verifyPassword(password as string, user?.password)

        if (!isVerified) {
          throw new Error('Las credenciales no son correctas.')
        }

        return {
          email: user.email,
          image: user.avatar?.url,
          name: `${user.firstName} ${user.lastName}`,
          id: user.id
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  }
})
