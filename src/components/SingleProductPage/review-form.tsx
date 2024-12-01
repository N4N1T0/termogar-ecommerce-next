'use client'

// * NEXT.JS IMPORTS
import { useRouter } from 'next/navigation'

// * ASSETS IMPORTS
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import FormFieldComponent from '../Auth/ResetPassword/form-field'
import { User } from 'next-auth'
import createReview from '@/actions/create-review'

// * UTILS IMPORTS
import { ReviewSchema, reviewSchema } from '@/lib/schemas'

const ReviewForm = ({
  product,
  user
}: {
  product: { id: string; title: string; url: string }
  user: User | undefined
}) => {
  const router = useRouter()
  const form = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: product.id.split('-').slice(-1)[0],
      product_title: product.title,
      product_url: product.url,
      review_title: '',
      review_content: '',
      review_score: 5,
      display_name: user?.name || '',
      email: user?.email || ''
    }
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset
  } = form

  const onSubmit = async (values: ReviewSchema) => {
    const response = await createReview(values)

    if (!response.success) {
      toast.error(response.message)
    } else {
      toast.success(response.message)
      reset()
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-10 space-y-8 bg-white p-5'
      >
        <FormFieldComponent
          control={control}
          isSubmitting={isSubmitting}
          label='Titulo de la Reseña'
          name='review_title'
          type='text'
          autocomplete='review-title'
          placeholder='100% Recomendado'
        />
        <FormFieldComponent
          control={control}
          isSubmitting={isSubmitting}
          label='Text de la Reseña'
          name='review_content'
          type='textarea'
          autocomplete='review-text'
          placeholder='Un trato ejemplar, un compra perfecta ...'
        />
        <FormField
          control={form.control}
          name='review_score'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(parseInt(value, 10))}
                  defaultValue={field.value.toString()}
                  className='flex space-x-1'
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <FormItem key={score}>
                      <FormControl className='peer'>
                        <RadioGroupItem
                          value={score.toString()}
                          className='sr-only'
                        />
                      </FormControl>
                      <FormLabel className='hover-200 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-sm hover:border-accent hover:text-accent focus:ring focus:ring-accent peer-aria-checked:border-accent peer-aria-checked:text-accent'>
                        {score}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className='flex w-full flex-wrap gap-5'>
          <FormFieldComponent
            control={control}
            isSubmitting={isSubmitting}
            label='Nombre Completo'
            name='display_name'
            type='text'
            autocomplete='review-user'
            placeholder='Juan ...'
            className='flex-1'
          />
          <FormFieldComponent
            control={control}
            isSubmitting={isSubmitting}
            label='Email'
            name='email'
            type='email'
            autocomplete='review-email'
            placeholder='jaun@perez.com'
            className='flex-1'
          />
        </fieldset>
        {isDirty && (
          <button
            type='submit'
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className='hover-200 bg-accent px-10 py-1 text-white hover:text-gray-500 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        )}
      </form>
    </Form>
  )
}

export default ReviewForm
