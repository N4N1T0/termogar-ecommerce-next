// Project Components Imports
import InputQuantityCom from '@/components/Helpers/InputQuantityCom'

// Utils Imports
import { cn } from '@/lib/utils'

// Types Imports
import { ProductTypes } from '@/types'

// Assets Imports
import { X } from 'lucide-react'

// Product Row Component for cleaner and reusable rows
const ProductRow = ({ product }: { product: ProductTypes }) => {
  return (
    <tr className='border-b bg-white hover:bg-gray-50'>
      <td className='w-[380px] py-4 pl-10'>
        <div className='flex items-center space-x-6'>
          <div className='flex h-[80px] w-[80px] items-center justify-center overflow-hidden border border-[#EDEDED]'>
            <img
              src={product.image}
              alt={product.title}
              className='h-full w-full object-contain'
            />
          </div>
          <div className='flex flex-1 flex-col'>
            <p className='text-qblack text-[15px] font-medium'>
              {product.image || 'Product Name'}
            </p>
          </div>
        </div>
      </td>
      <td className='px-2 py-4 text-center'>
        <div className='flex items-center justify-center'>
          <span
            className='block h-[20px] w-[20px] rounded-full'
            style={{ backgroundColor: '#EDEDED' }}
          ></span>
        </div>
      </td>
      <td className='px-2 py-4 text-center'>
        <span className='text-[15px] font-normal'>
          {product.price || '$20'}
        </span>
      </td>
      <td className='py-4 text-center'>
        <div className='grid h-full place-content-center'>
          <InputQuantityCom />
        </div>
      </td>
      <td className='py-4 text-center'>
        <span className='text-[15px] font-normal'>
          ${Number(product.price) * 2 || 200}
        </span>
      </td>
      <td className='py-4'>
        <div className='grid h-full place-content-center'>
          <button className='text-[#AAAAAA]' aria-label='Remove product'>
            <X className='h-5 w-5 transition-colors duration-150 ease-in hover:text-black' />
          </button>
        </div>
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
  products: ProductTypes[]
}) {
  return (
    <div className={cn('w-full', className)}>
      <div className='relative w-full overflow-x-auto border border-[#EDEDED]'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead>
            <tr className='default-border-bottom whitespace-nowrap border-b bg-[#F6F6F6] px-2 text-[13px] font-medium uppercase text-black'>
              <th className='block min-w-[300px] py-4 pl-10'>Product</th>
              <th className='py-4 text-center'>Color</th>
              <th className='py-4 text-center'>Price</th>
              <th className='py-4 text-center'>Quantity</th>
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
