import { Link } from 'react-router-dom'
import Compair from './Helpers/icons/Compair'
import QuickViewIco from './Helpers/icons/QuickViewIco'
import ThinLove from './Helpers/icons/ThinLove'

export default function TestCom() {
  return (
    <>
      <div className='container-x mx-auto mt-20'>
        <div className='grid grid-cols-3 gap-10'>
          <div className='item'>
            <div
              className='product-card-style-one-two group relative h-full w-full overflow-hidden bg-white'
              style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
            >
              <div
                className='product-card-img mt-4 h-[322px] w-full'
                style={{
                  background: `url(${
                    process.env.NEXT_PUBLIC_URL
                  }/assets/images/product-img-2.1.jpg) no-repeat center`
                }}
              ></div>
              <div className='product-card-details relative flex h-[102px] items-center justify-center'>
                {/* add to card button */}
                <div className='absolute -bottom-20 left-[80px] h-[54px] w-[204px] transition-all duration-300 ease-in-out group-hover:bottom-[65px]'>
                  <button type='button' className='yellow-btn'>
                    <div>
                      <span>Add To Cart</span>
                    </div>
                  </button>
                </div>
                <div>
                  <Link to='/single-product'>
                    <p className='title font-600 text-qblack mb-2.5 line-clamp-2 text-center text-[20px] leading-[24px] hover:text-blue-600'>
                      Table and Chair Set
                    </p>
                  </Link>
                  <div className='price'>
                    <span className='offer-price font-600 mr-1 inline-block text-center text-[18px] text-red-500'>
                      32,499BDT
                    </span>
                    <span className='main-price font-600 text-center text-[18px] text-gray-500 line-through'>
                      48,600BDT
                    </span>
                  </div>
                </div>
              </div>
              {/* quick-access-btns */}
              <div className='quick-access-btns absolute -right-[50px] top-20 flex flex-col space-y-2 transition-all duration-300 ease-in-out group-hover:right-[50px]'>
                <a href='#'>
                  <span className='flex h-10 w-10 items-center justify-center rounded bg-[#CCECEB]'>
                    <QuickViewIco />
                  </span>
                </a>
                <a href='#'>
                  <span className='flex h-10 w-10 items-center justify-center rounded bg-[#CCECEB]'>
                    <ThinLove />
                  </span>
                </a>
                <a href='#'>
                  <span className='flex h-10 w-10 items-center justify-center rounded bg-[#CCECEB]'>
                    <Compair />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
