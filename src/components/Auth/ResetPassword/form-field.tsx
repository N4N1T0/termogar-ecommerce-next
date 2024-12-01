'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface FormFieldComponentProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder: string
  type?:
    | 'text'
    | 'email'
    | 'date'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'textarea'
    | 'password'
  options?: string[]
  isSubmitting: boolean
  className?: string | null
  autocomplete?: string | null
}

const FormFieldComponent = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  options = [],
  isSubmitting,
  className = '',
  autocomplete = ''
}: FormFieldComponentProps<T>) => {
  // State to show or hide the password
  const [showPassword, setShowPassword] = useState(false)

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <FormField
      control={control}
      name={name} // Type assertion for the name
      render={({ field }) => (
        <FormItem
          className={`${type === 'checkbox' ? 'flex flex-row-reverse items-center justify-end gap-2' : ''} ${className}`}
        >
          <FormLabel className='font-bold text-gray-800'>
            {label === 'He Leído las Privacy Policy' ? (
              <span>
                He Leído{' '}
                <Link
                  className='text-accent hover:underline'
                  target='_blank'
                  href='/privacy policy'
                >
                  las Privacy Policy
                </Link>
              </span>
            ) : (
              label
            )}
          </FormLabel>
          <FormControl>
            {type === 'select' ? (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className='rounded-none border border-gray-200'>
                    <SelectValue
                      placeholder={placeholder}
                      className='font-normal text-gray-600'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='rounded-none border border-gray-200 bg-white'>
                  {options.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className='font-medium focus:bg-accent/20'
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === 'checkbox' ? (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
                className='!mt-0'
              />
            ) : type === 'radio' ? (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='flex flex-col space-y-1'
                disabled={isSubmitting}
              >
                {options.map((option) => (
                  <FormItem
                    key={option}
                    className='flex items-center space-x-3'
                  >
                    <FormControl>
                      <RadioGroupItem value={option} disabled={isSubmitting} />
                    </FormControl>
                    <FormLabel className='font-normal'>{option}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            ) : type === 'file' ? (
              <Input
                type='file'
                onChange={(e) => field.onChange(e.target.files)} // Handle file input change
                disabled={isSubmitting}
                className='rounded-none border border-gray-200'
              />
            ) : type === 'textarea' ? (
              <Textarea
                placeholder={placeholder}
                className='resize-none rounded-none border-gray-200'
                disabled={isSubmitting}
                cols={30}
                rows={4}
                {...field}
              />
            ) : type === 'password' ? (
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={placeholder}
                  className='mb-2 rounded-none border-gray-200'
                  autoComplete={autocomplete || type || ''}
                  id={name}
                  disabled={isSubmitting}
                  aria-label='Contraseña'
                  {...field}
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-600' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-600' />
                  )}
                </button>
              </div>
            ) : (
              <Input
                type={type}
                autoComplete={autocomplete || type}
                placeholder={placeholder}
                {...field}
                disabled={isSubmitting}
                className='rounded-none border border-gray-200'
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldComponent
