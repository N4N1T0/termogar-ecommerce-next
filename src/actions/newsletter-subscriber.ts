'use server'

import NewsletterRegistration from '@/emails/newsletter-registration'
import NewsletterUserEmail from '@/emails/welcome-newsletter'
import { resend } from '@/lib/clients'

// * UTILS IMPORTS
import { subscribeSchema } from '@/lib/schemas'
import { sanityClientWrite } from '@/sanity/lib/client'
import { SubscriberNewsletter } from '@/types/sanity'
import { uuid } from '@sanity/uuid'
import { AuthError } from 'next-auth'
import { Logger } from 'next-axiom'

const log = new Logger()

const subscribeToNewsletter = async ({ email }: { email: string }) => {
  const validatedData = subscribeSchema.safeParse({ email })

  try {
    if (!validatedData.success) {
      log.warn(`Invalid email: ${validatedData.error.issues[0].message}`)
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
      log.info(
        `The user with email ${validatedData.data.email} is already subscribed to the newsletter`
      )
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

    log.info(`New subscriber created: ${validatedData.data.email}`)

    await resend.emails.send({
      from: 'registro-newsletter@termogar.es',
      to: ['hola@termogar.es'],
      subject: 'Suscripción al Newsletter',
      react: NewsletterRegistration({
        email: validatedData.data.email,
        registrationDate: new Date().toISOString()
      })
    })

    await resend.emails.send({
      from: 'registro-newsletter@termogar.es',
      to: [validatedData.data.email],
      subject: 'Suscripción al Newsletter',
      react: NewsletterUserEmail({
        registrationDate: new Date().toISOString(),
        couponCode: 'DESCUENTO3'
      })
    })

    log.info(`Email sent to ${validatedData.data.email}`)

    return {
      success: true,
      message: 'Gracias por suscribirte a nuestro newsletter'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      log.error(`Error during authentication: ${error.cause?.err?.message}`)
      return {
        success: false,
        message: error.cause?.err?.message
      }
    }
    log.error(
      // @ts-expect-error Unknown error
      `Error during the subscription: ${error.message || 'Unknown error'}`
    )
    return {
      success: false,
      message: 'Ocurrió un error durante el inicio de sesión'
    }
  }
}

export default subscribeToNewsletter
