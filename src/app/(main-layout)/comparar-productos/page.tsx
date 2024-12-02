import CompaireProductsClientPage from '@/components/Compaire/client-page'
import PageTitle from '@/components/Helpers/PageTitle'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparación de Productos',
  description:
    'Comparación de productos para ver las diferencias y similitudes entre ellos'
}

const CompaireProductsPage = () => {
  return (
    <main className='mx-auto w-full max-w-screen-2xl pb-[40px]'>
      <div className='mb-5 w-full'>
        <PageTitle
          breadcrumb={[
            { name: 'P. Principal', path: '/' },
            { name: 'Compara Productos', path: '/comparar-productos' }
          ]}
          title='Comparación de Productos'
        />
        <CompaireProductsClientPage />
      </div>
    </main>
  )
}

export default CompaireProductsPage
