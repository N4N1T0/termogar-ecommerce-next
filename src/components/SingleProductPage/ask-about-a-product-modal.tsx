'use client'

// * NEXT.JS IMPORTS
import React from 'react'

// * ASSETS IMPORTS
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'
import { Form } from '@/components/ui/form'
import { MessageCircleQuestion } from 'lucide-react'

// * UTILS IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { reportProductSchema, ReportProductSchema } from '@/lib/schemas'
import reportProduct from '@/actions/report-product'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export function AskAboutProduct({
  productName
}: {
  productName: string | null
}) {
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()

  const form = useForm<ReportProductSchema>({
    resolver: zodResolver(reportProductSchema),
    defaultValues: {
      email: session?.user?.email || '',
      message: '',
      productName: productName || ''
    }
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset
  } = form

  const onSubmit = async (values: ReportProductSchema) => {
    const response = await reportProduct(values)

    if (!response.success) {
      toast.error(response.message, {
        duration: 4000
      })
    } else {
      toast.success(response.message, {
        duration: 4000
      })
      setOpen(false)
      reset()
    }
  }

  React.useEffect(() => {
    if (session && session.user && session.user.email) {
      form.setValue('email', session?.user?.email)
    }
  }, [session, form])

  if (!productName) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex gap-3 text-accent underline shadow-none'
          title='Preguntar sobre el producto'
        >
          <MessageCircleQuestion /> ¿Tienes alguna Duda?
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-none border-none bg-white sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-accent'>
            Preguntar sobre el Producto
          </DialogTitle>
          <DialogDescription>
            Estamos aquí para resolver cualquier inquietud que tengas sobre este
            producto!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormFieldComponent
                control={control}
                isSubmitting={isSubmitting}
                label='Email'
                name='email'
                type='email'
                autocomplete='email'
                placeholder='termogra@example.com'
              />
              <FormFieldComponent
                control={control}
                isSubmitting={isSubmitting}
                label='Mensaje'
                name='message'
                type='textarea'
                autocomplete='message'
                placeholder='Tengo una duda sobre ...'
              />
            </div>
            <DialogFooter>
              {isDirty && (
                <button
                  type='submit'
                  aria-disabled
                  className='hover-200 bg-accent px-10 py-1 text-white hover:text-gray-500'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
