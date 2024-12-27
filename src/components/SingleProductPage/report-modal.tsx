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
import { Flag } from 'lucide-react'

// * UTILS IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { reportProductSchema, ReportProductSchema } from '@/lib/schemas'
import reportProduct from '@/actions/report-product'
import { toast } from 'sonner'

export function ReportProductModal({ productName }: { productName: string }) {
  const [open, setOpen] = React.useState(false)

  const form = useForm<ReportProductSchema>({
    resolver: zodResolver(reportProductSchema),
    defaultValues: {
      productName: productName,
      reason: 'falso',
      description: ''
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
        duration: 4000,
        classNames: {
          toast: 'bg-red-500 text-white'
        }
      })
    } else {
      toast.success(response.message, {
        duration: 4000,
        classNames: {
          toast: 'text-green-500 border-green-500'
        }
      })
      setOpen(false)
      reset()
    }
  }

  if (!productName) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex gap-3 text-accent underline'>
          <Flag /> Reportar Producto
        </button>
      </DialogTrigger>
      <DialogContent className='rounded-none border-none bg-white sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-accent'>Reportar Producto</DialogTitle>
          <DialogDescription>
            Reporta problemas con el producto &quot;{productName}&quot;.
            Revisaremos tu informe y tomaremos las medidas apropiadas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormFieldComponent
                control={control}
                isSubmitting={isSubmitting}
                label='Motivo'
                name='reason'
                options={['inapropiado', 'falso', 'ofensivo', 'otro']}
                type='select'
                autocomplete='reason'
                placeholder='Motivo'
              />
              <FormFieldComponent
                control={control}
                isSubmitting={isSubmitting}
                label='Descripción'
                name='description'
                type='textarea'
                autocomplete='description'
                placeholder='El producto es un ...'
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
