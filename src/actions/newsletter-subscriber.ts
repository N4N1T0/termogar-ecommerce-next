'use server'

import NewsletterRegistration from '@/emails/newsletter-registration'
import { resend } from '@/lib/clients'
// * UTILS IMPORTS
import { subscribeSchema } from '@/lib/schemas'
import { sanityClientWrite } from '@/sanity/lib/client'
import { SubscriberNewsletter } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { AuthError } from 'next-auth'

const subscribeToNewsletter = async ({ email }: { email: string }) => {
  const validatedData = subscribeSchema.safeParse({ email })

  try {
    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0].message
      }
    }

    const existingSubscriber = await sanityClientWrite.fetch(
      `*[_type == "subscriberNewsletter" && email == $email][0]`,
      { email: validatedData.data.email }
    )

    if (existingSubscriber) {
      return {
        success: false,
        message: 'Ya estas subscrito a nuestro newsletter'
      }
    }

    // Create the new subscriber document
    await sanityClientWrite.createIfNotExists<SubscriberNewsletter>({
      _type: 'subscriberNewsletter',
      _id: `subscriber-${uuid()}`,
      email: validatedData.data.email,
      subscribedDate: new Date().toISOString(),
      active: true,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: `subscriber-${uuid()}`
    })

    // TODO: Change the email address
    await resend.emails.send({
      from: 'registro-newsletter@termogar.es',
      bcc: ['adrian.alvarezalonso1991@gmail.com'],
      to: ['adrian.alvarezalonso1991@gmail.com'],
      subject: 'Suscripción al Newsletter',
      react: NewsletterRegistration({
        email: validatedData.data.email,
        registrationDate: new Date().toISOString()
      })
    })

    return {
      success: true,
      message: 'Gracias por suscribirte a nuestro newsletter'
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

export default subscribeToNewsletter
