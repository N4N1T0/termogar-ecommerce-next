import Image from 'next/image'
import Link from 'next/link'
import { PlaceholderSquare } from '@/assets'
import { handleCompareTableCharacteristics } from '@/lib/utils'
import { ProductCardType } from '@/types'
import siteData from '@/data/site-data.json'
import { CompaireProductTableRemover } from './compaire-helpers'

const CompaireProductTable = ({
  products
}: {
  products: ProductCardType[]
}) => {
  return (
    <section
      id='compaire-table'
      className='m-10 flex items-start justify-start overflow-x-auto bg-white'
    >
      <div className='border-gray-500-border w-full border'>
        <table className='w-full max-w-fit'>
          <tbody>
            {/* Header Row */}
            <tr className='table-row-wrapper'>
              <td className='sticky left-0 z-10 w-60 bg-[#FAFAFA] px-[26px] pt-[30px] align-top'>
                <h1 className='mb-4 text-[18px] font-medium text-gray-900'>
                  Comparación de Productos
                </h1>
                <p className='text-gray-500two text-[13px]'>
                  Selecciona productos para ver las diferencias y similitudes
                  entre ellos
                </p>
              </td>
              {products.map(({ id, featuredMedia, title, slug }) => (
                <td
                  key={id}
                  className='product border-gray-500-border relative w-[235px] border-b border-r bg-white p-6'
                >
                  <div className='product-img mb-3 flex justify-center'>
                    <div className='h-[161px] w-[161px]'>
                      <Image
                        src={featuredMedia?.url || PlaceholderSquare}
                        alt={title || 'Sin Nombre'}
                        title={title || 'Sin Nombre'}
                        width={200}
                        height={200}
                        className='h-full w-full object-contain'
                      />
                    </div>
                  </div>
                  <Link
                    href={`/producto/${slug}`}
                    className='hover-200 mb-2 text-pretty text-center text-[15px] font-medium leading-6 text-accent hover:text-gray-900'
                  >
                    {title}
                  </Link>
                  <div className='absolute right-3 top-3'>
                    <CompaireProductTableRemover id={id} />
                  </div>
                </td>
              ))}
            </tr>
            {/* Characteristic Rows */}
            {siteData.compaireCharacteristics.map(({ label, key }) => (
              <tr className='table-row-wrapper' key={key}>
                <td className='sticky left-0 z-10 w-60 bg-gray-100 px-6 py-2 align-top'>
                  <h3 className='text-[15px] font-medium text-gray-900'>
                    {label}
                  </h3>
                </td>
                {products.map((product, index) => (
                  <td
                    key={index}
                    className='product border-gray-500-border w-[235px] border-r bg-white px-6 pb-[20px] align-top'
                  >
                    <span
                      className={`font-normal ${key === 'price' ? 'text-[20px] text-accent' : 'text-[13px] text-gray-700'}`}
                    >
                      {handleCompareTableCharacteristics(product, key)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CompaireProductTable
