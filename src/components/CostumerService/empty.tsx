import Link from 'next/link'
import Empty from './empty-ilustration'

export default function CostumerServiceError() {
  return (
    <section
      id='cart-empty'
      className='mt-5 flex h-[80vh] w-full flex-col items-center justify-center gap-4'
    >
      <Empty />
      <h1 className='my-2 text-center text-base font-semibold sm:text-2xl'>
        Lo sentimos mucho no tenemos contendido para ti
      </h1>
      <p>Estamos trabajando en ello!</p>
      <Link
        href='/'
        className='hover-200 h-[50px] w-[180px] bg-accent px-2 py-4 text-center text-gray-900 hover:text-gray-100'
      >
        Volver a la Tienda
      </Link>
    </section>
  )
}
