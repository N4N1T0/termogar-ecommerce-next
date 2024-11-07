import { Link } from 'react-router-dom'
import { useRef } from 'react'
import SimpleSlider from '../Helpers/SliderCom'

export default function Banner({ className }) {
  const sliderRef = useRef(null)
  const settings = {
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true
        }
      }
    ]
  }
  return (
    <>
      <div
        className={`hero-slider-wrapper hero-slider-wrapper h-[500px] w-full xl:h-[733px] ${
          className || ''
        }`}
      >
        <div className='main-wrapper h-full w-full'>
          <div className='relative mb-20 w-full xl:mb-0 xl:h-full'>
            <SimpleSlider settings={settings} selector={sliderRef}>
              <div className='item h-[500px] w-full xl:h-[733px]'>
                <div
                  className='relative h-full w-full md:bg-center'
                  style={{
                    backgroundImage: `url('/assets/images/banner-5.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                >
                  <div className='container-x mx-auto flex h-full items-center'>
                    <div className='h-full w-full items-center pt-20 xl:flex xl:pt-0'>
                      <div className='w-full md:w-[626px]'>
                        <p className='text-qblack mb-[7px] text-[20px] font-medium md:text-[34px]'>
                          Fashion Hunt
                        </p>
                        <h1 className='text-qblack mb-[44px] text-[40px] font-bold leading-[40px] md:text-[60px] md:leading-[80px]'>
                          Shop the Hottest Brands and Designs at Shop0
                        </h1>

                        <Link to='#' passhref='true'>
                          <div rel='noopener noreferrer'>
                            <div className='bg-qh5-bwhite group relative flex h-[52px] w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:text-white'>
                              <div className='relative z-10 flex items-center space-x-1 transition-all duration-300 ease-in-out'>
                                <span className='font-600 mr-2 text-sm leading-7 tracking-wide'>
                                  Shop Now
                                </span>
                                <span>
                                  <svg
                                    width='7'
                                    height='11'
                                    viewBox='0 0 7 11'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='fill-current'
                                  >
                                    <rect
                                      x='2.08984'
                                      y='0.636719'
                                      width='6.94219'
                                      height='1.54271'
                                      transform='rotate(45 2.08984 0.636719)'
                                    ></rect>
                                    <rect
                                      x='7'
                                      y='5.54492'
                                      width='6.94219'
                                      height='1.54271'
                                      transform='rotate(135 7 5.54492)'
                                    ></rect>
                                  </svg>
                                </span>
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`
                                }}
                                className='absolute bottom-0 left-0 right-0 top-0 h-full w-full origin-[center_left] scale-x-0 transform bg-black group-hover:origin-[center_right] group-hover:scale-x-100'
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='item h-[500px] w-full xl:h-[733px]'>
                <div
                  className='relative h-full w-full md:bg-center'
                  style={{
                    backgroundImage: `url('/assets/images/banner-5.1.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                >
                  <div className='container-x mx-auto flex h-full items-center'>
                    <div className='h-full w-full items-center pt-20 xl:flex xl:pt-0'>
                      <div className='w-full md:w-[626px]'>
                        <p className='text-qblack mb-[7px] text-[20px] font-medium md:text-[34px]'>
                          Fashion Hunt
                        </p>
                        <h1 className='text-qblack mb-[44px] text-[40px] font-bold leading-[40px] md:text-[60px] md:leading-[80px]'>
                          Shop the Hottest Brands and Designs at Shop0
                        </h1>

                        <Link to='#' passhref='true'>
                          <div rel='noopener noreferrer'>
                            <div className='bg-qh5-bwhite group relative flex h-[52px] w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:text-white'>
                              <div className='relative z-10 flex items-center space-x-1 transition-all duration-300 ease-in-out'>
                                <span className='font-600 mr-2 text-sm leading-7 tracking-wide'>
                                  Shop Now
                                </span>
                                <span>
                                  <svg
                                    width='7'
                                    height='11'
                                    viewBox='0 0 7 11'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='fill-current'
                                  >
                                    <rect
                                      x='2.08984'
                                      y='0.636719'
                                      width='6.94219'
                                      height='1.54271'
                                      transform='rotate(45 2.08984 0.636719)'
                                    ></rect>
                                    <rect
                                      x='7'
                                      y='5.54492'
                                      width='6.94219'
                                      height='1.54271'
                                      transform='rotate(135 7 5.54492)'
                                    ></rect>
                                  </svg>
                                </span>
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`
                                }}
                                className='absolute bottom-0 left-0 right-0 top-0 h-full w-full origin-[center_left] scale-x-0 transform bg-black group-hover:origin-[center_right] group-hover:scale-x-100'
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='item h-[500px] w-full xl:h-[733px]'>
                <div
                  className='relative h-full w-full md:bg-center'
                  style={{
                    backgroundImage: `url('/assets/images/banner-5.2.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                >
                  <div className='container-x mx-auto flex h-full items-center'>
                    <div className='h-full w-full items-center pt-20 xl:flex xl:pt-0'>
                      <div className='w-full md:w-[626px]'>
                        <p className='text-qblack mb-[7px] text-[20px] font-medium md:text-[34px]'>
                          Fashion Hunt
                        </p>
                        <h1 className='text-qblack mb-[44px] text-[40px] font-bold leading-[40px] md:text-[60px] md:leading-[80px]'>
                          Shop the Hottest Brands and Designs at Shop0
                        </h1>

                        <Link to='#' passhref='true'>
                          <div rel='noopener noreferrer'>
                            <div className='bg-qh5-bwhite group relative flex h-[52px] w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:text-white'>
                              <div className='relative z-10 flex items-center space-x-1 transition-all duration-300 ease-in-out'>
                                <span className='font-600 mr-2 text-sm leading-7 tracking-wide'>
                                  Shop Now
                                </span>
                                <span>
                                  <svg
                                    width='7'
                                    height='11'
                                    viewBox='0 0 7 11'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='fill-current'
                                  >
                                    <rect
                                      x='2.08984'
                                      y='0.636719'
                                      width='6.94219'
                                      height='1.54271'
                                      transform='rotate(45 2.08984 0.636719)'
                                    ></rect>
                                    <rect
                                      x='7'
                                      y='5.54492'
                                      width='6.94219'
                                      height='1.54271'
                                      transform='rotate(135 7 5.54492)'
                                    ></rect>
                                  </svg>
                                </span>
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`
                                }}
                                className='absolute bottom-0 left-0 right-0 top-0 h-full w-full origin-[center_left] scale-x-0 transform bg-black group-hover:origin-[center_right] group-hover:scale-x-100'
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleSlider>
          </div>
        </div>
      </div>
      <div className='container-x mx-auto mb-[60px]'>
        <div
          data-aos='fade-up'
          style={{
            backgroundImage: `url(/assets/images/service-bg.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
          className='best-services flex w-full flex-col space-y-10 px-10 py-10 lg:h-[110px] lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:py-0'
        >
          <div className='item'>
            <div className='flex items-center space-x-5'>
              <div>
                <span>
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1 1H5.63636V24.1818H35'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M34.9982 1H11.8164V18H34.9982V1Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M11.8164 7.18164H34.9982'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className='font-700 mb-1 text-[15px] tracking-wide text-white'>
                  Free Shipping
                </p>
                <p className='text-sm text-gray-500 text-white'>
                  When ordering over $100
                </p>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='flex items-center space-x-5'>
              <div>
                <span>
                  <svg
                    width='32'
                    height='34'
                    viewBox='0 0 32 34'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                    />
                    <path
                      d='M30.7 2L29.5 10.85L20.5 9.65'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className='font-700 mb-1 text-[15px] tracking-wide text-white'>
                  Free Return
                </p>
                <p className='text-sm text-gray-500 text-white'>
                  Get Return within 30 days
                </p>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='flex items-center space-x-5'>
              <div>
                <span>
                  <svg
                    width='32'
                    height='38'
                    viewBox='0 0 32 38'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className='font-700 mb-1 text-[15px] tracking-wide text-white'>
                  Secure Payment
                </p>
                <p className='text-sm text-gray-500 text-white'>
                  100% Secure Online Payment
                </p>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='flex items-center space-x-5'>
              <div>
                <span>
                  <svg
                    width='32'
                    height='35'
                    viewBox='0 0 32 35'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                    />
                    <path
                      d='M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                    />
                    <path
                      d='M16 28V22'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                    />
                    <path
                      d='M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                    <path
                      d='M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z'
                      stroke='#95D7DE'
                      strokeWidth='2'
                      strokeMiterlimit='10'
                      strokeLinecap='square'
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p className='font-700 mb-1 text-[15px] tracking-wide text-white'>
                  Best Quality
                </p>
                <p className='text-sm text-gray-500 text-white'>
                  Original Product Guarenteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
