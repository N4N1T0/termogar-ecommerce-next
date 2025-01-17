'use client'

// * NEXT.JS IMPORTS
import React from 'react'
import { useForm } from 'react-hook-form'

// * ASSETS IMPORTS
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Bell } from 'lucide-react'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/Auth/ResetPassword/form-field'

// * UTILS IMPORTS
import { CartItemType } from '@/types'
import notifyMe from '@/actions/notifyme'
import { toast } from 'sonner'

const NoStockNotifyMe = ({ product }: { product: CartItemType }) => {
  const [open, setOpen] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
      id: product.id
    }
  })

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset
  } = form

  const onSubmit = async ({ email, id }: { email: string; id: string }) => {
    const response = await notifyMe({ email, id })

    if (!response?.success) {
      toast.error(response?.message, {
        duration: 4000
      })
    } else {
      toast.success(response.message, {
        duration: 4000
      })
      reset()
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='w-full rounded-none bg-gray-900 text-gray-100 transition-colors duration-150 ease-in hover:text-accent'
          name='notify'
          value={product.id}
        >
          <Bell size={18} />
          Notificarme
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Notificarme</DialogTitle>
          <DialogDescription>
            En estos momentos no hay stock disponible para este producto. pero
            en cuanto tengamos, seras el primero en avisar, déjanos tu email
            para que nos podamos contactar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' name='id' value={product.id} />
            <FormFieldComponent
              className='mb-5 w-full'
              label=''
              type='email'
              name='email'
              placeholder='juan@perez.com'
              autocomplete='email'
              control={control}
              isSubmitting={isSubmitting}
            />
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-none bg-gray-900 text-gray-100 transition-colors duration-150 ease-in hover:text-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NoStockNotifyMe
