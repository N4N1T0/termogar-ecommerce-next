import products from '../../data/products.json'
import ProductCardStyleOne from '../Helpers/Cards/ProductCardStyleOne'
import CountDown from '../Helpers/CountDown'
import DataIteration from '../Helpers/DataIteration'
import Layout from '../Partials/Layout'

export default function FlashSale() {
  const { showDate, showHour, showMinute, showSecound } =
    CountDown('2023-03-04 4:00:00')
  return (
    <Layout>
      <div className='flashsale-wrapper w-full'>
        <div className='container-x mx-auto'>
          <div className='w-full'>
            <div
              style={{
                background: `url(${
                  process.env.NEXT_PUBLIC_URL
                }/assets/images/flash-sale-ads.png) no-repeat`,
                backgroundSize: 'cover'
              }}
              data-aos='fade-right'
              className='flash-ad mb-10 flex h-[400px] w-full items-center justify-center sm:justify-end'
            >
              <div className='sm:mr-[75px]'>
                <div className='countdown-wrapper flex w-full justify-evenly space-x-3 sm:justify-between sm:space-x-6'>
                  <div className='countdown-item'>
                    <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                      <span className='font-700 text-base text-[#EB5757] sm:text-[30px]'>
                        {showDate}
                      </span>
                    </div>
                    <p className='font-500 text-center text-xs leading-8 text-white sm:text-[18px]'>
                      Days
                    </p>
                  </div>
                  <div className='countdown-item'>
                    <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                      <span className='font-700 text-base text-[#2F80ED] sm:text-[30px]'>
                        {showHour}
                      </span>
                    </div>
                    <p className='font-500 text-center text-xs leading-8 text-white sm:text-[18px]'>
                      Hours
                    </p>
                  </div>
                  <div className='countdown-item'>
                    <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                      <span className='font-700 text-base text-[#219653] sm:text-[30px]'>
                        {showMinute}
                      </span>
                    </div>
                    <p className='font-500 text-center text-xs leading-8 text-white sm:text-[18px]'>
                      Minutes
                    </p>
                  </div>
                  <div className='countdown-item'>
                    <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                      <span className='font-700 text-base text-[#EF5DA8] sm:text-[30px]'>
                        {showSecound}
                      </span>
                    </div>
                    <p className='font-500 text-center text-xs leading-8 text-white sm:text-[18px]'>
                      Seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='products grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
              <DataIteration
                datas={products.products.slice(0, 16)}
                startLength={0}
                endLength={16}
              >
                {({ datas }) => (
                  <div data-aos='fade-up' key={datas.id} className='item'>
                    <ProductCardStyleOne datas={datas} />
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
