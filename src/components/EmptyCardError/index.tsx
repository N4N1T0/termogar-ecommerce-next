import Link from 'next/link'
import Empty from './Empty'

export default function EmptyCardError() {
  return (
    <div className='empty-card-wrapper w-full'>
      <div className='flex w-full items-center justify-center'>
        <div>
          <div className='mb-5 scale-50 transform sm:mb-10 sm:scale-100'>
            <Empty />
          </div>
          <div data-aos='fade-up' className='empty-content w-full'>
            <h1 className='mb-5 text-center text-base font-semibold sm:text-xl'>
              ¡Vacío! No tienes productos en el carrito
            </h1>
            <Link href='/'>
              <div className='flex w-full justify-center'>
                <div className='h-[50px] w-[180px]'>
                  <button type='button' className='yellow-btn'>
                    Volver a la Tienda
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
