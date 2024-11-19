'use client'

// * ASSETS IMPORTS
import BreadcrumbCom from '@/components/BreadcrumbCom'
import EmptyCompaireError from '@/components/Compaire/empty'
import CompaireProductTable from '@/components/Compaire/product-table'
import LoaderStyleOne from '@/components/Helpers/Loaders/LoaderStyleOne'
import PageTitle from '@/components/Helpers/PageTitle'

// * UTILS IMPORTS
import { useCompare } from '@/stores'

const CompaireProductsPage = () => {
  const { products, rehydrated } = useCompare()

  if (!rehydrated) {
    return (
      <section id='Empty-Cart' className='mt-10 w-full'>
        <div className='mx-auto w-full max-w-screen-xl px-2 md:px-6'>
          <BreadcrumbCom
            paths={[
              { name: 'P. Principal', path: '/' },
              { name: 'Compara Productos', path: '/comparar-productos' }
            ]}
          />
          <div className='grid h-full w-full place-content-center'>
            <LoaderStyleOne />
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section id='Empty-Cart' className='mt-10 w-full'>
        <div className='mx-auto w-full max-w-screen-xl px-2 md:px-6'>
          <BreadcrumbCom
            paths={[
              { name: 'P. Principal', path: '/' },
              { name: 'Compara Productos', path: '/comparar-productos' }
            ]}
          />
          <EmptyCompaireError />
        </div>
      </section>
    )
  }

  return (
    <main className='w-full bg-white pb-[40px]'>
      <div className='mb-5 w-full'>
        <PageTitle
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Compara Productos', path: '/comparar-productos' }
          ]}
          title='Comparación de Productos'
        />
        <CompaireProductTable products={products} />
      </div>
    </main>
  )
}

export default CompaireProductsPage
