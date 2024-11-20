import { useState } from 'react'
import productDatas from '../../data/products.json'
import BreadcrumbCom from '../BreadcrumbCom'
import ProductCardStyleOne from '../Helpers/Cards/product-card-style-one'
import Layout from '../Partials/Layout'
import ProductsFilter from './ProductsFilter'

export default function AllProductPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false
  })

  const checkboxHandler = (e) => {
    const { name } = e.target
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }))
  }
  const [volume, setVolume] = useState({ min: 200, max: 500 })

  const [storage, setStorage] = useState(null)
  const filterStorage = (value) => {
    setStorage(value)
  }
  const [filterToggle, setToggle] = useState(false)

  const { products } = productDatas

  return (
    <>
      <Layout>
        <div className='products-page-wrapper w-full'>
          <div className='container-x mx-auto'>
            <BreadcrumbCom />
            <div className='w-full lg:flex lg:space-x-[30px]'>
              <div className='lg:w-[270px]'>
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  className='mb-[30px]'
                />
                {/* ads */}
                <div className='hidden h-[295px] w-full lg:block'>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_URL
                    }/assets/images/bannera-5.png`}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
              </div>

              <div className='flex-1'>
                <div className='products-sorting mb-[40px] flex w-full flex-col space-y-5 bg-white p-[30px] md:h-[70px] md:flex-row md:items-center md:justify-between md:space-y-0'>
                  <div>
                    <p className='font-400 text-[13px]'>
                      <span className='text-gray-500'> Showing</span> 1–16 of 66
                      results
                    </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <span className='font-400 text-[13px]'>Sort by:</span>
                    <div className='flex items-center space-x-3 border-b border-b-gray-500'>
                      <span className='font-400 text-[13px] text-gray-500'>
                        Default
                      </span>
                      <span>
                        <svg
                          width='10'
                          height='6'
                          viewBox='0 0 10 6'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M1 1L5 5L9 1' stroke='#9A9A9A' />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type='button'
                    className='flex h-10 w-10 items-center justify-center rounded border border-accent text-accent lg:hidden'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                      />
                    </svg>
                  </button>
                </div>
                <div className='mb-[40px] grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]'>
                  {products.slice(0, 6).map((product, index) => (
                    <div data-aos='fade-up' key={product.id}>
                      <ProductCardStyleOne datas={product} />
                    </div>
                  ))}
                </div>

                <div className='mb-[40px] h-[164px] w-full overflow-hidden'>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_URL
                    }/assets/images/bannera-6.png`}
                    alt=''
                    className='h-full w-full object-contain'
                  />
                </div>
                <div className='mb-[40px] grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]'>
                  {products.slice(6, 15).map((product, index) => (
                    <div data-aos='fade-up' key={product.id}>
                      <ProductCardStyleOne datas={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
