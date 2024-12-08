// * NEXT.JS IMPORTS
import Image from 'next/image'
import Link from 'next/link'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import { CartItemType } from '@/types'

// * UTILS IMPORTS
import { cn, eurilize } from '@/lib/utils'
import {
  CartProductTableQuantity,
  CartProductTableRemover
} from '@/components/Cart/cart-helpers'

// Product Row Component for cleaner and reusable rows
const ProductRow = ({ product }: { product: CartItemType }) => {
  const { featuredMedia, title, price, sale, id, quantity, slug } = product
  return (
    <tr className='border-b bg-white hover:bg-gray-50'>
      <td className='w-[380px] py-4 pl-10'>
        <div className='flex items-center space-x-6'>
          <div className='flex h-[80px] w-[80px] items-center justify-center overflow-hidden border border-[#EDEDED]'>
            <Image
              src={featuredMedia?.url || PlaceholderSquare}
              alt={title || 'Sin Nombre'}
              title={title || 'Sin Nombre'}
              width={100}
              height={100}
              className='h-full w-full object-contain'
            />
          </div>
          <div className='flex flex-1 flex-col'>
            <Link
              href={`/producto/${slug}`}
              className='text-qblack text-[15px] font-medium transition-colors duration-150 ease-in-out hover:text-accent'
            >
              {title || 'Sin Nombre'}
            </Link>
          </div>
        </div>
      </td>
      <td className='px-2 py-4 text-center'>
        <div className='flex items-center justify-center'>
          {eurilize(price || 0)}
        </div>
      </td>
      <td className='px-2 py-4 text-center'>
        <span className='text-[15px] font-normal'>
          {sale ? eurilize(sale.price || 0) : 'Sin Ofertas'}
        </span>
      </td>
      <td className='py-4 text-center'>
        <div className='grid h-full place-content-center'>
          <CartProductTableQuantity id={id} />
        </div>
      </td>
      <td className='py-4 text-center'>
        <span className='text-[15px] font-normal'>
          {eurilize((sale?.price || price || 1) * quantity)}
        </span>
      </td>
      <td className='py-4'>
        <CartProductTableRemover id={id} />
      </td>
    </tr>
  )
}

// Main Products Table Component
export default function ProductsTable({
  className,
  products
}: {
  className?: string
  products: CartItemType[]
}) {
  return (
    <div className={cn('w-full', className)}>
      <div className='relative w-full overflow-x-auto border border-[#EDEDED]'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead>
            <tr className='default-border-bottom whitespace-nowrap border-b bg-[#F6F6F6] px-2 text-[13px] font-medium uppercase text-black'>
              <th className='block min-w-[300px] py-4 pl-10'>Producto</th>
              <th className='py-4 text-center'>Precio</th>
              <th className='py-4 text-center'>Oferta</th>
              <th className='py-4 text-center'>Cantidad</th>
              <th className='py-4 text-center'>Total</th>
              <th className='w-[114px] py-4 text-right'></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow key={index} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
