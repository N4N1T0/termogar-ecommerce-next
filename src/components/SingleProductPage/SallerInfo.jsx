import ProductCardStyleOne from '../Helpers/Cards/ProductCardStyleOne'
import DataIteration from '../Helpers/DataIteration'
import Star from '../Helpers/icons/Star'

export default function SallerInfo({ products }) {
  return (
    <div className='saller-info-wrapper w-full'>
      <div className='saller-info items-center justify-between border-b border-[#E8E8E8] pb-[30px] sm:flex'>
        <div className='items-center sm:flex sm:w-1/4 sm:space-x-5'>
          <div className='saller h-[73px] w-[73px] overflow-hidden rounded-full'>
            <img
              src={`${
                process.env.NEXT_PUBLIC_URL
              }/assets/images/comment-user-1.png`}
              alt='saller'
              className='h-full w-full object-cover'
            />
          </div>
          <div>
            <h6 className='text-[18px] font-medium leading-[30px]'>
              Ridoy Rock
            </h6>
            <p className='text-[13px] font-normal leading-[30px] text-gray-500'>
              London,United Kingdom
            </p>
            <div className='mt-4 flex items-center'>
              <div className='flex'>
                <Star w='15' h='15' />
                <Star w='15' h='15' />
                <Star w='15' h='15' />
                <Star w='15' h='15' />
                <Star w='15' h='15' />
              </div>
              <span className='ml-1 text-[13px] font-normal'>(4.5)</span>
            </div>
          </div>
        </div>
        <div className='mt-5 w-full flex-1 justify-between sm:ml-[60px] sm:mt-0 sm:flex sm:space-x-5'>
          <div className='mb-5 w-full sm:mb-0'>
            <ul>
              <li className='leading-[30px] text-gray-500'>
                <span className='text-qblack text-[15px] font-normal'>
                  Products
                </span>
                : 120
              </li>
              <li className='leading-[30px] text-gray-500'>
                <span className='text-qblack text-[15px] font-normal'>
                  Category
                </span>
                : Mobile Phone, Sports, Gaming, Electronics
              </li>
              <li className='leading-[30px] text-gray-500'>
                <span className='text-qblack text-[15px] font-normal'>
                  Tags
                </span>
                : Beer, Foamer
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <ul>
              <li className='leading-[30px] text-gray-500'>
                <span className='text-qblack text-[15px] font-normal'>
                  Products
                </span>
                : 120
              </li>
              <li className='leading-[30px] text-gray-500'>
                <span className='text-qblack text-[15px] font-normal'>
                  Category
                </span>
                : Mobile Phone, Sports, Gaming, Electronics
              </li>
              <li className='leading-[30px] text-gray-500'>
                <span className='text-qblack text-[15px] font-normal'>
                  Tags
                </span>
                : Beer, Foamer
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='saller-product mt-[30px] w-full'>
        <h1 className='mb-5 text-[18px] font-medium'>Product from Shop</h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
          <DataIteration
            datas={products}
            startLength={0}
            endLength={products.length}
          >
            {({ datas }) => (
              <div key={datas.id} className='item'>
                <ProductCardStyleOne datas={datas} />
              </div>
            )}
          </DataIteration>
        </div>
      </div>
    </div>
  )
}
