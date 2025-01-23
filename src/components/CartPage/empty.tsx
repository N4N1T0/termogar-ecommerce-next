import Link from 'next/link'
import Empty from './empty-ilustration'

export default function EmptyCartError() {
  return (
    <section
      id='cart-empty'
      className='flex h-[80vh] w-full flex-col items-center justify-center gap-4'
    >
      <Empty />
      <h1 className='my-2 text-center text-base font-semibold sm:text-2xl'>
        Vacío! No tienes productos en tu Carrito de la Compra
      </h1>
      <Link
        href='/'
        className='hover-200 h-[50px] w-[180px] bg-accent px-2 py-4 text-center text-gray-100 hover:text-gray-900'
      >
        Volver a la Tienda
      </Link>
    </section>
  )
}
