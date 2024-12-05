import { z } from 'zod'

// * SCHEMAS
export const subscribeSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required')
})

export const addressSchema = z.object({
  firstName: z.string().optional(),
  address1: z.string().min(1, 'Dirección 1 es requerida.'),
  address2: z.string().optional(),
  city: z.string().min(1, 'Ciudad es requerida.'),
  postcode: z.string().min(1, 'Código Postal es requerido.'),
  state: z.string().min(1, 'Estado/Provincia es requerido.'),
  email: z.string().email('Correo Electrónico no es válido.').optional(),
  phone: z.string().optional()
})

export const costumerSchema = z.object({
  email: z.string().email('Correo Electrónico no es válido.').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  billingAddress: addressSchema,
  shippingAddresses: addressSchema,
  isPayingCustomer: z.boolean().optional()
})

export const passwordReset = z
  .object({
    password: z.string().regex(/^(?=.*\d).{8,}$/, {
      message:
        'La contraseña debe tener al menos 8 caracteres e incluir al menos un dígito.'
    }),
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })

export const loginSchema = z.object({
  email: z.string().email().min(2, {
    message: 'El email es requerido'
  }),
  password: z.string().min(2, {
    message: 'La contraseña es requerida'
  })
})

export const signupSchema = z
  .object({
    email: z.string().email().min(2, {
      message: 'El email es requerido'
    }),
    password: z
      .string()
      .regex(/^(?=.*\d).{8,}$/, {
        message:
          'La contraseña debe tener al menos 8 caracteres e incluir al menos un dígito.'
      })
      .optional(),
    confirmPassword: z.string().optional()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })

export const reportProductSchema = z.object({
  productName: z
    .string()
    .min(2, { message: 'el Id del producto es obligatorio' }),
  reason: z.enum(['inapropiado', 'falso', 'ofensivo', 'otro']),
  description: z.string().min(2, { message: 'la descripción es obligatoria' })
})

export const reviewSchema = z.object({
  product_id: z.string().min(1, 'El ID del producto es requerido'),
  product_title: z
    .string()
    .min(1, 'El título de la review es requerido')
    .max(150, 'El título de la review debe tener 150 caracteres o menos'),
  product_url: z
    .string()
    .min(1, 'La URL del producto es requerida')
    .max(150, 'La URL del producto debe tener 150 caracteres o menos'),
  review_title: z
    .string()
    .min(1, 'El título de la review es requerido')
    .max(150, 'El título de la review debe tener 150 caracteres o menos'),
  review_content: z.string().min(1, 'El contenido de la review es requerido'),
  review_score: z.number().int().min(1).max(5),
  display_name: z.string().min(1, 'El nombre de visualización es requerido'),
  email: z.string().email('Correo electrónico no válido'),
  custom_fields: z.record(z.string()).optional(),
  metadata: z.record(z.string()).optional()
})

export const rateReviewSchema = z.object({
  reviewId: z.string().min(1),
  voteType: z.union([z.literal('up'), z.literal('down')])
})

export const checkoutUser = z
  .object({
    ...costumerSchema.shape,
    password: z.string().regex(/^(?=.*\d).{8,}$/, {
      message:
        'La contraseña debe tener al menos 8 caracteres e incluir al menos un dígito.'
    }),
    confirmPassword: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })

// * TYPES
export type RateReviewSchema = z.infer<typeof rateReviewSchema>
export type ReviewSchema = z.infer<typeof reviewSchema>
export type ReportProductSchema = z.infer<typeof reportProductSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type AddressSchema = z.infer<typeof addressSchema>
export type CostumerSchema = z.infer<typeof costumerSchema>
export type PasswordSchema = z.infer<typeof passwordReset>
export type SignupSchema = z.infer<typeof signupSchema>
export type CheckoutUser = z.infer<typeof checkoutUser>
