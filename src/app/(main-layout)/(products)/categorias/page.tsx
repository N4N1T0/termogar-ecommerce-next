// * NEXT.JS IMPORTS
import { Metadata } from 'next'

// * UTILS IMPORTS
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'
import { sanityClientRead } from '@/sanity/lib/client'
import PageTitle from '@/components/Helpers/PageTitle'
import { Logger } from 'next-axiom'
import CategoryCard from '@/components/Helpers/Cards/CategoryCard'

export const metadata: Metadata = {
  title: 'Categorias',
  description:
    'Encuentra el artículo que mejor se adapte a tus necesidades según las categorías dentro de la web de termogar.'
}

const log = new Logger()

const CategoriesPage = async () => {
  const navbarMenu = await sanityClientRead.fetch(
    GET_MENU_CATEGORIES,
    {},
    {
      cache: 'force-cache',
      next: {
        revalidate: 600
      }
    }
  )

  if (!navbarMenu) return log.error('No se encontraron categorias')

  return (
    <main className='container mx-auto px-4 py-8'>
      <PageTitle
        title='Nuestras Categorias'
        breadcrumb={[
          { name: 'P. Principal', path: '/' },
          { name: 'Categorias', path: '/categorias' }
        ]}
      />
      <div className='grid grid-cols-2 gap-8 pt-10 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
        {navbarMenu.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  )
}

export default CategoriesPage
