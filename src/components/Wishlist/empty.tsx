import Link from 'next/link'
import Empty from './empty-ilustration'

export default function EmptyWishlistError() {
  return (
    <section
      id='wishlist-empty'
      className='flex h-[80vh] w-full flex-col items-center justify-center gap-4'
    >
      <Empty />
      <h1 className='my-2 text-center text-base font-semibold sm:text-2xl'>
        Vacío! No tienes productos en tu lista de deseos
      </h1>
      <Link
        href='/'
        className='hover-200 h-[50px] w-[180px] bg-accent px-2 py-4 text-center text-gray-900 hover:text-gray-100'
      >
        Volver a la Tienda
      </Link>
    </section>
  )
}
