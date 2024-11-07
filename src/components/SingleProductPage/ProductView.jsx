import { useState } from 'react'
import Star from '../Helpers/icons/Star'
import Selectbox from '../Helpers/Selectbox'

export default function ProductView({ className, reportHandler }) {
  const productsImg = [
    {
      id: 1,
      src: 'product-details-1.png',
      color: '#FFBC63'
    },
    {
      id: 2,
      src: 'product-details-2.png',
      color: '#649EFF'
    },
    {
      id: 3,
      src: 'product-details-3.png',
      color: '#FFFFFF'
    },
    {
      id: 4,
      src: 'product-details-4.png',
      color: '#FF7173'
    },
    {
      id: 6,
      src: 'product-details-5.png',
      color: ''
    }
  ]

  const [src, setSrc] = useState(productsImg[0].src)
  const changeImgHandler = (current) => {
    setSrc(current)
  }
  const [quantity, setQuantity] = useState(1)
  const increment = () => {
    setQuantity((prev) => prev + 1)
  }
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div
      className={`product-view w-full justify-between lg:flex ${
        className || ''
      }`}
    >
      <div data-aos='fade-right' className='lg:mr-[50px] lg:w-1/2 xl:mr-[70px]'>
        <div className='w-full'>
          <div className='border-gray-500-border relative mb-3 flex h-[600px] w-full items-center justify-center overflow-hidden border'>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/assets/images/${src}`}
              alt=''
              className='object-contain'
            />
            <div className='text-qblack absolute left-[30px] top-[30px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-accent text-xl font-medium'>
              <span>-50%</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            {productsImg &&
              productsImg.length > 0 &&
              productsImg.map((img) => (
                <div
                  onClick={() => changeImgHandler(img.src)}
                  key={img.id}
                  className='border-gray-500-border h-[110px] w-[110px] cursor-pointer border p-[15px]'
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/assets/images/${
                      img.src
                    }`}
                    alt=''
                    className={`h-full w-full object-contain ${
                      src !== img.src ? 'opacity-50' : ''
                    } `}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='product-details mt-10 w-full lg:mt-0'>
          <span
            data-aos='fade-up'
            className='mb-2 inline-block text-xs font-normal uppercase tracking-wider text-gray-500'
          >
            Mobile Phones
          </span>
          <p
            data-aos='fade-up'
            className='text-qblack mb-4 text-xl font-medium'
          >
            Samsung Galaxy Z Fold3 5G 3 colors in 512GB
          </p>

          <div
            data-aos='fade-up'
            className='mb-6 flex items-center space-x-[10px]'
          >
            <div className='flex'>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <span className='text-qblack text-[13px] font-normal'>
              6 Reviews
            </span>
          </div>

          <div data-aos='fade-up' className='mb-7 flex items-center space-x-2'>
            <span className='font-500 mt-2 text-sm text-gray-500 line-through'>
              $9.99
            </span>
            <span className='font-500 text-2xl text-red-500'>$6.99</span>
          </div>

          <p
            data-aos='fade-up'
            className='text-normal mb-[30px] text-sm leading-7 text-gray-500'
          >
            It is a long established fact that a reader will be distracted by
            the readable there content of a page when looking at its layout.
          </p>

          <div data-aos='fade-up' className='colors mb-[30px]'>
            <span className='mb-[14px] inline-block text-sm font-normal uppercase text-gray-500'>
              COLOR
            </span>

            <div className='flex items-center space-x-4'>
              {productsImg &&
                productsImg.length > 0 &&
                productsImg.map((img) => (
                  <div key={img.id}>
                    {img.color && img.color !== '' && (
                      <button
                        onClick={() => changeImgHandler(img.src)}
                        type='button'
                        style={{ '--tw-ring-color': `${img.color}` }}
                        className='flex h-[20px] w-[20px] items-center justify-center rounded-full ring-offset-2 focus:ring-2'
                      >
                        <span
                          style={{ background: `${img.color}` }}
                          className='block h-[20px] w-[20px] rounded-full border'
                        ></span>
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div data-aos='fade-up' className='product-size mb-[30px]'>
            <span className='mb-[14px] inline-block text-sm font-normal uppercase text-gray-500'>
              SIZE
            </span>
            <div className='w-full'>
              <div className='border-gray-500-border flex h-[50px] cursor-pointer items-center justify-between border px-6'>
                <Selectbox
                  className='w-full'
                  datas={['Small', 'Medium', 'Large', 'Extra Large']}
                >
                  {({ item }) => (
                    <>
                      <div>
                        <span className='text-qblack text-[13px]'>{item}</span>
                      </div>
                      <div className='flex items-center space-x-10'>
                        <span className='text-qblack text-[13px]'>
                          3”W x 3”D x 7”H
                        </span>
                        <span>
                          <svg
                            width='11'
                            height='7'
                            viewBox='0 0 11 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                              fill='#222222'
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                </Selectbox>
              </div>
            </div>
          </div>

          <div
            data-aos='fade-up'
            className='quantity-card-wrapper mb-[30px] flex h-[50px] w-full items-center space-x-[10px]'
          >
            <div className='border-gray-500-border flex h-full w-[120px] items-center border px-[26px]'>
              <div className='flex w-full items-center justify-between'>
                <button
                  onClick={decrement}
                  type='button'
                  className='text-base text-gray-500'
                >
                  -
                </button>
                <span className='text-qblack'>{quantity}</span>
                <button
                  onClick={increment}
                  type='button'
                  className='text-base text-gray-500'
                >
                  +
                </button>
              </div>
            </div>
            <div className='border-gray-500-border flex h-full w-[60px] items-center justify-center border'>
              <button type='button'>
                <span>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z'
                      stroke='#D5D5D5'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className='h-full flex-1'>
              <button
                type='button'
                className='black-btn h-full w-full text-sm font-semibold'
              >
                Add To Cart
              </button>
            </div>
          </div>

          <div data-aos='fade-up' className='mb-[20px]'>
            <p className='text-[13px] leading-7 text-gray-500'>
              <span className='text-qblack'>Category :</span> Kitchen
            </p>
            <p className='text-[13px] leading-7 text-gray-500'>
              <span className='text-qblack'>Tags :</span> Beer, Foamer
            </p>
            <p className='text-[13px] leading-7 text-gray-500'>
              <span className='text-qblack'>SKU:</span> KE-91039
            </p>
          </div>

          <div
            data-aos='fade-up'
            className='mb-[20px] flex items-center space-x-2'
          >
            <span>
              <svg
                width='12'
                height='13'
                viewBox='0 0 12 13'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z'
                  fill='#EB5757'
                />
              </svg>
            </span>

            <button
              type='button'
              onClick={reportHandler}
              className='text-[13px] font-semibold text-red-500'
            >
              Report This Item
            </button>
          </div>

          <div
            data-aos='fade-up'
            className='social-share flex w-full items-center'
          >
            <span className='text-qblack mr-[17px] inline-block text-[13px]'>
              Share This
            </span>

            <div className='flex items-center space-x-5'>
              <span>
                <svg
                  width='10'
                  height='16'
                  viewBox='0 0 10 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z'
                    fill='#3E75B2'
                  />
                </svg>
              </span>
              <span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 0C3.6 0 0 3.6 0 8C0 11.4 2.1 14.3 5.1 15.4C5 14.8 5 13.8 5.1 13.1C5.2 12.5 6 9.1 6 9.1C6 9.1 5.8 8.7 5.8 8C5.8 6.9 6.5 6 7.3 6C8 6 8.3 6.5 8.3 7.1C8.3 7.8 7.9 8.8 7.6 9.8C7.4 10.6 8 11.2 8.8 11.2C10.2 11.2 11.3 9.7 11.3 7.5C11.3 5.6 9.9 4.2 8 4.2C5.7 4.2 4.4 5.9 4.4 7.7C4.4 8.4 4.7 9.1 5 9.5C5 9.7 5 9.8 5 9.9C4.9 10.2 4.8 10.7 4.8 10.8C4.8 10.9 4.7 11 4.5 10.9C3.5 10.4 2.9 9 2.9 7.8C2.9 5.3 4.7 3 8.2 3C11 3 13.1 5 13.1 7.6C13.1 10.4 11.4 12.6 8.9 12.6C8.1 12.6 7.3 12.2 7.1 11.7C7.1 11.7 6.7 13.2 6.6 13.6C6.4 14.3 5.9 15.2 5.6 15.7C6.4 15.9 7.2 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z'
                    fill='#E12828'
                  />
                </svg>
              </span>
              <span>
                <svg
                  width='18'
                  height='14'
                  viewBox='0 0 18 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17.0722 1.60052C16.432 1.88505 15.7562 2.06289 15.0448 2.16959C15.7562 1.74278 16.3253 1.06701 16.5742 0.248969C15.8985 0.640206 15.1515 0.924742 14.3335 1.10258C13.6933 0.426804 12.7686 0 11.7727 0C9.85206 0 8.28711 1.56495 8.28711 3.48557C8.28711 3.7701 8.32268 4.01907 8.39382 4.26804C5.51289 4.12577 2.9165 2.73866 1.17371 0.604639C0.889175 1.13814 0.71134 1.70722 0.71134 2.34742C0.71134 3.5567 1.31598 4.62371 2.27629 5.26392C1.70722 5.22835 1.17371 5.08608 0.675773 4.83711V4.87268C0.675773 6.5799 1.88505 8.00258 3.48557 8.32268C3.20103 8.39382 2.88093 8.42938 2.56082 8.42938C2.34742 8.42938 2.09845 8.39382 1.88505 8.35825C2.34742 9.74536 3.62784 10.7768 5.15722 10.7768C3.94794 11.7015 2.45412 12.2706 0.818041 12.2706C0.533505 12.2706 0.248969 12.2706 0 12.2351C1.56495 13.2309 3.37887 13.8 5.37062 13.8C11.8082 13.8 15.3294 8.46495 15.3294 3.84124C15.3294 3.69897 15.3294 3.52113 15.3294 3.37887C16.0052 2.9165 16.6098 2.31186 17.0722 1.60052Z'
                    fill='#3FD1FF'
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
