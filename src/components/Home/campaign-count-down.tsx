'use client'

// * NEXTJS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import CountDown from '../Helpers/CountDown'
import { CampaignCountDownProps } from '@/types'
import { PlaceholderSquare } from '@/assets'
import { ArrowRight } from 'lucide-react'

// * UTILS
import { cn } from '@/lib/utils'
const color = [
  'text-[#EB5757]',
  'text-[#2F80ED]',
  'text-[#27AE60]',
  'text-[#F2994A]'
]
const labels = ['Dias', 'Horas', 'Minutos', 'Segundos']

const CampaignCountDown = ({ className, data }: CampaignCountDownProps) => {
  const countdown = CountDown(data?.date || '2025-10-04 4:00:00')

  // TODO: Refactor to have less DOM Elements

  return (
    <section id='offers' className={cn('w-full lg:h-[460px]', className)}>
      <div className='container-x mx-auto h-full'>
        <div className='h-full items-center lg:flex lg:space-x-5 xl:space-x-[30px]'>
          <div className='campaign-countdown mb-5 h-full w-full lg:mb-0 lg:w-1/2'>
            <Link href='/ofertas'>
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
                  <ArrowRight />
                </div>
              </div>
            </Link>
          </div>
          <Image
            className='download-app h-[430px] flex-1 p-5 lg:h-full xl:p-12'
            src={data?.media.url || PlaceholderSquare}
            alt='Ofertas'
            title='Ofertas'
            placeholder='blur'
            blurDataURL={data?.media.blur || PlaceholderSquare.blurDataURL}
          />
        </div>
      </div>
    </section>
  )
}

export default CampaignCountDown