'use client'

// * NEXTJS IMPORTS
import Image from 'next/image'

// * ASSETS IMPORTS
import CountDown from '@/components/Helpers/CountDown'
import { PlaceholderSquare } from '@/assets'

// * UTILS IMPORTS
import { CampaignCountDownProps } from '@/types'
import saleData from '@/data/site-data.json'
import { cn } from '@/lib/utils'

const OffersBanners = ({ className, data }: CampaignCountDownProps) => {
  const countdown = CountDown(data?.date || '2025-10-04 4:00:00')

  return (
    <div
      className={cn(
        'mb-10 flex h-fit w-full flex-col items-center justify-center bg-white sm:justify-end md:h-[400px] md:flex-row',
        className
      )}
    >
      <div className='flex h-full flex-1 items-center justify-center p-5'>
        <Image
          className='aspect-square h-full'
          src={data?.media.url || PlaceholderSquare}
          alt='Ofertas'
          title='Ofertas'
          placeholder='blur'
          width={500}
          height={500}
          blurDataURL={data?.media.blur || PlaceholderSquare.blurDataURL}
        />
      </div>
      <div className='sm:mr-[75px]'>
        <div className='countdown-wrapper flex w-full justify-evenly space-x-3 sm:justify-between sm:space-x-6'>
          {countdown &&
            countdown.map((item, index) => (
              <div className='countdown-item' key={`countdown-${index}`}>
                <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                  <span
                    className={`font-700 text-5xl md:text-7xl ${saleData?.colors[index]}`}
                  >
                    {item}
                  </span>
                </div>
                <p className='font-500 text-center text-[12px] leading-8 text-accent sm:text-[18px]'>
                  {saleData.labels[index]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default OffersBanners
