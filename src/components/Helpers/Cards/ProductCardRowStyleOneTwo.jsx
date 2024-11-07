import { Link } from 'react-router-dom'
import Compair from '../icons/Compair'
import QuickViewIco from '../icons/QuickViewIco'
import ThinLove from '../icons/ThinLove'

export default function ProductCardRowStyleOneTwo({ className, datas }) {
  return (
    <div
      data-aos='fade-left'
      className={`product-row-card-style-one-two group relative h-[250px] w-full overflow-hidden bg-white ${
        className || ''
      }`}
    >
      <div className='flex h-full w-full items-center space-x-5 p-[16px]'>
        <div className='h-full w-1/3'>
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/assets/images/${datas.image}`}
            alt=''
            className='h-full w-full object-contain'
          />
        </div>
        <div className='flex h-full flex-1 flex-col justify-center'>
          <div>
            <Link to='/single-product'>
              <p className='title font-600 text-qblack mb-2 line-clamp-2 text-[15px] leading-[24px] hover:text-blue-600 sm:text-[20px]'>
                {datas.title}
              </p>
            </Link>
            <p className='price mb-2.5 flex items-center space-x-2'>
              <span className='offer-price font-600 text-base text-red-500 sm:text-[24px]'>
                {datas.offer_price}
              </span>
              <span className='main-price font-600 text-base text-gray-500 line-through sm:text-[18px]'>
                {datas.price}
              </span>
            </p>
            <button type='button' className='h-[40px] w-[116px]'>
              <span className='yellow-btn'> Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className='quick-access-btns absolute -right-10 top-[30px] flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-4'>
        <a href='#'>
          <span className='bg-primarygray flex h-10 w-10 items-center justify-center rounded'>
            <QuickViewIco />
          </span>
        </a>
        <a href='#'>
          <span className='bg-primarygray flex h-10 w-10 items-center justify-center rounded'>
            <ThinLove />
          </span>
        </a>
        <a href='#'>
          <span className='bg-primarygray flex h-10 w-10 items-center justify-center rounded'>
            <Compair />
          </span>
        </a>
      </div>
    </div>
  )
}
