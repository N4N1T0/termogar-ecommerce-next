import { z } from 'zod'

export const SubscribeSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required')
})
