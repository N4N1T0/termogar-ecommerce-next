// * NEXT.JS IMPORTS
import dynamic from 'next/dynamic'

// * ASSETS IMPORTS
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// * UTILS IMPORTS
import { DimensionKey, YoptopReviews } from '@/types'
import { User } from 'next-auth'
import { PortableText } from 'next-sanity'
import { GET_WHOLE_PRODUCT_BY_SLUGResult } from '@/types/sanity'

const Reviews = dynamic(
  () => import('@/components/SingleProductPage/Reviews'),
  {
    loading: () => (
      <main className='w-full space-y-5'>
        {Array(3)
          .fill('product-reviews')
          .map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='h-auto w-full animate-pulse space-y-3 bg-gray-200 p-5'
            >
              <div className='flex w-full items-center justify-between'>
                <div>
                  <div className='h-10 w-10 rounded-full bg-gray-50' />
                </div>
                <div className='h-8 w-24 bg-gray-50' />
              </div>
              <div className='h-8 w-1/2 bg-gray-50' />
              <div className='h-6 w-full bg-gray-50' />
              <div className='h-6 w-full bg-gray-50' />
              <div className='h-6 w-full bg-gray-50' />
            </div>
          ))}
      </main>
    )
  }
)

const ModalDocumentation = dynamic(
  () => import('@/components/SingleProductPage/pdf-modal'),
  {
    loading: () => (
      <main className='flex w-full gap-3 space-y-5'>
        {Array(3)
          .fill('product-documents')
          .map((item, index) => (
            <div
              key={`${item}-${index}`}
              className='h-[280px] w-[200px] animate-pulse bg-gray-200'
            />
          ))}
      </main>
    )
  }
)

const SingleProductTabs = ({
  product,
  user,
  reviews
}: {
  product: GET_WHOLE_PRODUCT_BY_SLUGResult
  reviews: YoptopReviews | undefined
  user: User | undefined
}) => {
  if (!product) return null

  const noDimension = !(
    ['height', 'width', 'length', 'weight'] as DimensionKey[]
  ).some((key) => product.dimensions?.[key] && product.dimensions[key]! > 0)

  return (
    <Tabs defaultValue='des' className='mt-10 w-full pb-[60px]' id='tabs'>
      {/* Tab Buttons */}
      <div className='tab-buttons mb-10 mt-5 w-full sm:mt-0'>
        <div className='container-x mx-auto justify-center overflow-x-auto overflow-y-hidden border-b-2 border-gray-200 md:flex'>
          <TabsList className='flex w-fit gap-10 rounded-none'>
            <TabsTrigger
              value='des'
              className='rounded-none py-3 text-base font-medium text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-gray-950'
            >
              Descripción
            </TabsTrigger>
            <TabsTrigger
              value='sizes'
              className='rounded-none py-3 text-base font-medium text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-gray-950'
            >
              Peso, Medidas y Datos Técnicos
            </TabsTrigger>
            <TabsTrigger
              value='info'
              className='rounded-none py-3 text-base font-medium text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-gray-950'
            >
              Documentación
            </TabsTrigger>
            <TabsTrigger
              value='review'
              className='rounded-none py-3 text-base font-medium text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-gray-900 sm:text-sm'
            >
              Reseñas
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className='container-x mx-auto min-h-[400px] w-full'>
        {/* Description Tab */}
        <TabsContent value='des' className='tab-content-item'>
          {product.content ? (
            <section className='prose w-full max-w-none text-pretty bg-white p-5'>
              <PortableText value={product.content} />
            </section>
          ) : (
            <h3 className='w-full bg-white p-5 text-center text-xl'>
              Sin Descripcion
            </h3>
          )}
        </TabsContent>

        {/* Sizes Tab */}
        <TabsContent
          value='sizes'
          className='tab-content-item grid w-full grid-cols-2 gap-5 divide-x-2 divide-gray-200 md:grid-cols-3 xl:grid-cols-4'
        >
          {noDimension ? (
            <>
              {product?.dimensions?.alt ? (
                <div className='prose text-pretty'>
                  <PortableText value={product?.dimensions?.alt} />
                </div>
              ) : (
                <h3 className='w-full bg-white p-5 text-center text-xl'>
                  Aun no tenemos Medidas de este Producto, Pronto lo
                  actualizaremos
                </h3>
              )}
            </>
          ) : (
            <div className='w-full'>
              <span className='text-2xl text-gray-900'>Dimensiones :</span>
              <span className='ml-2 text-xl'>
                {product?.dimensions?.height || 'N/D'} X{' '}
                {product?.dimensions?.width || 'N/D'} X{' '}
                {product?.dimensions?.length || 'N/D'}
              </span>
            </div>
          )}
          <>
            {product.ean && (
              <div className='w-full pl-3'>
                <span className='text-2xl text-gray-900'>EAN :</span>
                <span className='ml-2 text-xl'>{product.ean}</span>
              </div>
            )}
            {product.referenceCode && (
              <div className='w-full pl-3'>
                <span className='text-2xl text-gray-900'>
                  Código de Referencia :
                </span>
                <span className='ml-2 text-xl'>{product.referenceCode}</span>
              </div>
            )}
          </>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent
          value='info'
          className='tab-content-item flex w-full gap-3'
        >
          {product.downloads && product.downloads.length > 0 ? (
            product.downloads.map((item, index) => (
              <ModalDocumentation
                key={`${item.title}-${item.url}-${index}`}
                pdf={item}
              />
            ))
          ) : (
            <h3 className='w-full bg-white p-5 text-center text-xl'>
              Aun no tenemos documentación de este Producto, Pronto lo
              actualizaremos
            </h3>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value='review' className='tab-content-item w-full'>
          <Reviews
            reviews={reviews}
            user={user}
            product={{
              id: product.id,
              title: product.title || 'Sin nombre',
              url: `${process.env.NEXT_PUBLIC_URL}producto/${product.slug}`
            }}
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default SingleProductTabs
