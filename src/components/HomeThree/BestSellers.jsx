import { Link } from 'react-router-dom'

export default function BestSellers({ className }) {
  return (
    <div className={`w-full ${className || ''}`}>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-[30px]'>
        <div
          data-aos='fade-left'
          data-aos-duration='500'
          className='item flex w-full flex-col items-center'
        >
          <div className='mb-2 flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full bg-white'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/saller-1.png`}
              alt=''
            />
          </div>
          <Link to='/saller-page'>
            <p className='font-500 text-center text-base'>Shopno BD</p>
          </Link>
        </div>
        <div
          data-aos='fade-left'
          data-aos-duration='400'
          className='item flex w-full flex-col items-center'
        >
          <div className='mb-2 flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full bg-white'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/saller-2.png`}
              alt=''
            />
          </div>
          <Link to='/saller-page'>
            <p className='font-500 text-center text-base'>Eecoms Shop</p>
          </Link>
        </div>
        <div
          data-aos='fade-left'
          data-aos-duration='300'
          className='item flex w-full flex-col items-center'
        >
          <div className='mb-2 flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full bg-white'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/saller-3.png`}
              alt=''
            />
          </div>
          <Link to='/saller-page'>
            <p className='font-500 text-center text-base'>Fusion X</p>
          </Link>
        </div>
        <div
          data-aos='fade-left'
          data-aos-duration='200'
          className='item flex w-full flex-col items-center'
        >
          <div className='mb-2 flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full bg-white'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/saller-4.png`}
              alt=''
            />
          </div>
          <Link to='/saller-page'>
            <p className='font-500 text-center text-base'>Rikayi Rox</p>
          </Link>
        </div>
        <div
          data-aos='fade-left'
          data-aos-duration='100'
          className='item flex w-full flex-col items-center'
        >
          <div className='mb-2 flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full bg-white'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/saller-5.png`}
              alt=''
            />
          </div>
          <Link to='/saller-page'>
            <p className='font-500 text-center text-base'>Habbriyi</p>
          </Link>
        </div>
        <div
          data-aos='fade-left'
          data-aos-duration='100'
          className='item flex w-full flex-col items-center'
        >
          <div className='mb-2 flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full bg-white'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/saller-6.png`}
              alt=''
            />
          </div>
          <Link to='/saller-page'>
            <p className='font-500 text-center text-base'>Rayhans</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
