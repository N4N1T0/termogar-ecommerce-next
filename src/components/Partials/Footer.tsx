// Next.js Imports
import Link from 'next/link'
import Image from 'next/image'

// Assets Imports
import Facebook from '@/components/Helpers/icons/Facebook'
import Instagram from '@/components/Helpers/icons/Instagram'
import Youtube from '@/components/Helpers/icons/Youtube'
import Logo3 from '@/assets/images/logo-3.svg'
import Gateways from '@/assets/images/payment-getways.png'

export default function Footer() {
  return (
    <footer className='footer-section-wrapper bg-white print:hidden'>
      <div className='container-x mx-auto block pt-[56px]'>
        <div className='mb-[50px] flex w-full flex-col items-center'>
          {/* logo area */}
          <div className='mb-[40px]'>
            <Link href='/'>
              <Image width='152' height='36' src={Logo3} alt='logo' />
            </Link>
          </div>
          <div className='h-[1px] w-full bg-[#E9E9E9]'></div>
        </div>
        <div className='mb-[50px] justify-between lg:flex'>
          <div className='mb-10 ml-0 w-full lg:mb-0 lg:w-[424px]'>
            <h1 className='font-500 mb-5 text-[#2F2F2F] text-[18]'>About Us</h1>
            <p className='w-[247px] text-[15px] leading-[28px] text-[#9A9A9A]'>
              We know there are a lot of threa developers our but we pride into
              a firm in the industry.
            </p>
          </div>
          <div className='flex-1 lg:flex'>
            <div className='mb-10 w-full lg:mb-0 lg:w-1/3'>
              <div className='mb-5'>
                <h6 className='font-500 text-[#2F2F2F] text-[18]'>Feature</h6>
              </div>
              <div>
                <ul className='flex flex-col space-y-4'>
                  <li>
                    <Link href='/about'>
                      <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/terms-condition'>
                      <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                        Terms Condition
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/all-products'>
                      <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                        Best Products
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='mb-10 w-full items-center lg:mb-0 lg:flex lg:w-1/3 lg:flex-col'>
              <div>
                <div className='mb-5'>
                  <h6 className='font-500 text-[#2F2F2F] text-[18]'>
                    General Links
                  </h6>
                </div>
                <div>
                  <ul className='flex flex-col space-y-4'>
                    <li>
                      <Link href='/blogs'>
                        <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                          Blog
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href='/tracking-order'>
                        <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                          Tracking Order
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href='/become-saller'>
                        <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                          Become Seller
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='mb-10 w-full items-center lg:mb-0 lg:flex lg:w-1/3 lg:flex-col'>
              <div>
                <div className='mb-5'>
                  <h6 className='font-500 text-[#2F2F2F] text-[18]'>Helpful</h6>
                </div>
                <div>
                  <ul className='flex flex-col space-y-4'>
                    <li>
                      <Link href='/flash-sale'>
                        <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                          Flash Sale
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href='/faq'>
                        <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                          FAQ
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href='/about'>
                        <span className='hover:text-qblack hover:border-qblack cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A]'>
                          Support
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-bar border-gray-500-border items-center justify-between border-t lg:flex lg:h-[82px]'>
          <div className='mb-3 flex items-center justify-between lg:space-x-5'>
            <div className='flex items-center space-x-5'>
              <a href='#'>
                <Instagram className='hover:text-qblack fill-current text-gray-500' />
              </a>
              <a href='#'>
                <Facebook className='hover:text-qblack fill-current text-gray-500' />
              </a>
              <a href='#'>
                <Youtube className='hover:text-qblack fill-current text-gray-500' />
              </a>
            </div>
            <span className='font-300 text-[10px] text-gray-500 sm:text-base'>
              ©2022
              <a
                href='https://quomodosoft.com/'
                target='_blank'
                rel='noreferrer'
                className='font-500 text-qblack mx-1'
              >
                Quomodosoft
              </a>
              All rights reserved
            </span>
          </div>
          <div className=''>
            <a href='#'>
              <Image
                width='318'
                height='28'
                src={Gateways}
                alt='payment-getways'
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
