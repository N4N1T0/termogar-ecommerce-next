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
      <Image
        className='download-app h-[430px] flex-1 p-5 lg:h-full xl:p-12'
        src={data?.media.url || PlaceholderSquare}
        alt='Ofertas'
        title='Ofertas'
        placeholder='blur'
        width={500}
        height={500}
        blurDataURL={data?.media.blur || PlaceholderSquare.blurDataURL}
      />
      <div className='sm:mr-[75px]'>
        <div className='countdown-wrapper flex w-full justify-evenly space-x-3 sm:justify-between sm:space-x-6'>
          {countdown &&
            countdown.map((item, index) => (
              <div className='countdown-item' key={`countdown-${index}`}>
                <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                  <span
                    className={`font-700 text-[14px] sm:text-[30px] ${saleData?.colors[index]}`}
                  >
                    {item}
                  </span>
                </div>
                <p className='font-500 text-center text-[12px] leading-8 sm:text-[18px]'>
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
