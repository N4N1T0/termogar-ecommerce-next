'use client'

// * NEXT.JS IMPORTS
import Form from 'next/form'
import { useQueryState, parseAsString } from 'nuqs'

// * ASSETS IMPORTS
import { Input } from '@/components/ui/input'

const SearchFilter = () => {
  const [search, setSearch] = useQueryState('search', parseAsString)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')

    if (!search) return

    setSearch(search.toString())
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
        defaultValue={search || ''}
        className='rounded-none border border-gray-600'
        autoComplete='search'
      />
    </Form>
  )
}

export default SearchFilter
