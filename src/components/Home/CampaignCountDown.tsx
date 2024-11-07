'use client'

import Link from 'next/link'
import CountDown from '../Helpers/CountDown'
import { CampaignCountDownProps } from '@/types'
import BannerImage from '@/assets/images/download-app-cover.png'

const color = [
  'text-[#EB5757]',
  'text-[#2F80ED]',
  'text-[#27AE60]',
  'text-[#F2994A]'
]

const labels = ['Dias', 'Horas', 'Minutos', 'Segundos']

export default function CampaignCountDown({
  className,
  lastDate,
  counterbg,
  appscreen
}: CampaignCountDownProps) {
  const countdown = CountDown(lastDate)

  // TODO: Refactor to have less DOM Elements

  return (
    <div className={`w-full lg:h-[460px] ${className || ''}`}>
      <div className='container-x mx-auto h-full'>
        <div className='h-full items-center lg:flex lg:space-x-5 xl:space-x-[30px]'>
          <div
            className='campaign-countdown mb-5 h-full w-full lg:mb-0 lg:w-1/2'
            style={{
              background: `url(${
                process.env.NEXT_PUBLIC_URL
              }/assets/images/campaign-cover-countdown.jpg) no-repeat`,
              backgroundSize: 'cover'
            }}
          >
            <Link href='/flash-sale'>
              <div className='p-5 xl:p-12'>
                <div className='countdown-wrapper mb-10 flex w-full justify-evenly lg:justify-between'>
                  {countdown &&
                    countdown.map((item, index) => (
                      <div
                        className='countdown-item'
                        key={`countdown-${index}`}
                      >
                        <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                          <span
                            className={`font-700 text-[14px] sm:text-[30px] ${color[index]}`}
                          >
                            {item}
                          </span>
                        </div>
                        <p className='font-500 text-center text-[12px] leading-8 sm:text-[18px]'>
                          {labels[index]}
                        </p>
                      </div>
                    ))}
                </div>
                <div className='countdown-title mb-4'>
                  <h1 className='text-qblack font-600 text-[44px]'>
                    WOOOAAA! OFERTAS
                  </h1>
                </div>
                <div className='inline-flex items-center space-x-2 border-b border-accent'>
                  <span className='font-600 text-sm leading-7 tracking-wide'>
                    Comprar Ahora
                  </span>
                  <span>
                    <svg
                      width='7'
                      height='11'
                      viewBox='0 0 7 11'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='2.08984'
                        y='0.636719'
                        width='6.94219'
                        height='1.54271'
                        transform='rotate(45 2.08984 0.636719)'
                        fill='#1D1D1D'
                      />
                      <rect
                        x='7'
                        y='5.54492'
                        width='6.94219'
                        height='1.54271'
                        transform='rotate(135 7 5.54492)'
                        fill='#1D1D1D'
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div
            className='download-app h-[430px] flex-1 p-5 lg:h-full xl:p-12'
            style={{
              background: `url(${counterbg || BannerImage.src}) no-repeat`,
              backgroundSize: 'cover'
            }}
          />
        </div>
      </div>
    </div>
  )
}
