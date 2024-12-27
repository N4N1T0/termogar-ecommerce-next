'use client'

// * NEXT.JS IMPORTS
import Form from 'next/form'
import { useRouter, useSearchParams } from 'next/navigation'

// * ASSETS IMPORTS
import { Input } from '@/components/ui/input'

const SearchFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')

    if (!search) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('search', search?.toString().toLowerCase())
    router.push(`?${params}`, { scroll: false })
  }

  return (
    <Form
      action=''
      onSubmit={handleSubmit}
      className='w-full space-y-2 pb-4 pt-2'
    >
      <h3 className='text-lg font-medium'>Nombre</h3>
      <Input
        type='text'
        name='search'
        placeholder='Buscar...'
        defaultValue={searchParams.get('search') || ''}
        className='rounded-none border border-gray-600'
        autoComplete='search'
      />
    </Form>
  )
}

export default SearchFilter
