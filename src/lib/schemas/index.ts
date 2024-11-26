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
  email: z.string().email('Correo Electrónico no es válido.'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  billingAddress: addressSchema,
  shippingAddresses: z.array(addressSchema).optional(),
  isPayingCustomer: z.boolean().optional()
})

export const passwordReset = z
  .object({
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

// * TYPES
export type LoginSchema = z.infer<typeof loginSchema>
export type AddressSchema = z.infer<typeof addressSchema>
export type CostumerSchema = z.infer<typeof costumerSchema>
export type PasswordSchema = z.infer<typeof passwordReset>
export type SignupSchema = z.infer<typeof signupSchema>
