'use server'

import { SubscribeSchema } from '@/lib/schemas'
import { sanityClientWrite } from '@/sanity/lib/client'
import { SubscriberNewsletter } from '@/types/sanity'
import { uuid } from '@sanity/uuid'

export async function subscribeToNewsletter({ email }: { email: string }) {
  const validatedData = SubscribeSchema.safeParse({ email })

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

  return {
    success: true,
    message: 'Gracias por suscribirte a nuestro newsletter'
  }
}