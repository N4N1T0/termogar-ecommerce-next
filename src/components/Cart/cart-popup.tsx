'use client'

// * NEXT.JS IMPORTS
import Image from 'next/image'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import { useCart } from '@/stores'

// * UTILS IMPORTS
import { cn, eurilize } from '@/lib/utils'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function CartPopup({ className }: { className?: string }) {
  const { products, removeProduct } = useCart()

  if (products.length === 0) {
    return null
  }

  const handleRemoveProduct = (id: string) => {
    removeProduct(id)
    toast('El producto se eliminó de la lista de deseos', { duration: 2000 })
  }

  return (
    <>
      <div
        style={{ boxShadow: ' 0px 15px 50px 0px rgba(0, 0, 0, 0.14)' }}
        className={cn(
          'cart-wrappwer w-[300px] border-t-[3px] bg-white',
          className
        )}
      >
        <div className='h-full w-full'>
          <div className='product-items h-[310px] overflow-y-scroll'>
            <ul>
              {products.map(({ id, featuredMedia, title, price, sale }) => (
                <li className='flex h-full w-full' key={id}>
                  <div className='my-[20px] flex items-center justify-center space-x-[6px] px-4'>
                    <div className='h-full w-[65px]'>
                      <Image
                        src={featuredMedia.url || PlaceholderSquare}
                        width={65}
                        height={65}
                        alt={title || 'Sin Nombre'}
                        title={title || 'Sin Nombre'}
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <div className='flex h-full flex-1 flex-col justify-center'>
                      <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[13px] leading-4 hover:text-blue-600'>
                        {title || 'Sin Nombre'}
                      </p>

                      <p className='price'>
                        <span className='offer-price font-600 ml-2 text-[15px] text-red-500'>
                          {sale
                            ? eurilize(sale.price || 0)
                            : eurilize(price || 0)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    className='mr-[15px] mt-[20px] inline-flex cursor-pointer'
                    onClick={() => handleRemoveProduct(id)}
                  >
                    <X
                      size={15}
                      className='hover-200 text-gray-500 hover:text-accent'
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='mb-[12px] mt-[20px] w-full px-4'>
            <div className='h-[1px] bg-[#F0F1F3]'></div>
          </div>
          <div className='product-actions mb-[30px] px-4'>
            <div className='total-equation mb-[28px] flex items-center justify-between'>
              <span className='font-500 text-qblack text-[15px]'>Subtotal</span>
              <span className='font-500 text-[15px] text-red-500'>$365</span>
            </div>
            <div className='product-action-btn'>
              <Link href='/carrito-de-la-compra'>
                <div className='hover-200 gray-btn mb-[10px] h-[50px] w-full hover:text-accent'>
                  <span>Ver el Carrito</span>
                </div>
              </Link>
              <Link href='/checkout'>
                <div className='h-[50px] w-full'>
                  <div className='yellow-btn'>
                    <span className='text-sm'>Pagar</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}