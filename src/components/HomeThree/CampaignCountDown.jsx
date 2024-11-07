import { Link } from 'react-router-dom'
import CountDown from '../Helpers/CountDown'

export default function CampaignCountDown({
  className,
  lastDate,
  counterbg,
  appscreen
}) {
  const { showDate, showHour, showMinute, showSecound } = CountDown(lastDate)

  return (
    <div>
      <div className={`w-full lg:h-[460px] ${className || ''}`}>
        <div className='container-x mx-auto h-full'>
          <div className='h-full items-center lg:flex lg:space-x-5 xl:space-x-[30px]'>
            <div
              data-aos='fade-right'
              className='campaign-countdown mb-5 h-full w-full lg:mb-0 lg:w-1/2'
              style={{
                background: `url(${
                  process.env.NEXT_PUBLIC_URL
                }/assets/images/campaign-cover-countdown.jpg) no-repeat`,
                backgroundSize: 'cover'
              }}
            >
              <Link to='/flash-sale'>
                <div className='w-full p-5 xl:p-12'>
                  <div className='countdown-wrapper mb-10 flex w-full justify-evenly lg:justify-between'>
                    <div className='countdown-item'>
                      <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                        <span className='font-700 text-[14px] text-[#EB5757] sm:text-[30px]'>
                          {showDate}
                        </span>
                      </div>
                      <p className='font-500 text-center text-[12px] leading-8 sm:text-[18px]'>
                        Days
                      </p>
                    </div>
                    <div className='countdown-item'>
                      <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                        <span className='font-700 text-[14px] text-[#2F80ED] sm:text-[30px]'>
                          {showHour}
                        </span>
                      </div>
                      <p className='font-500 text-center text-[12px] leading-8 sm:text-[18px]'>
                        Hours
                      </p>
                    </div>
                    <div className='countdown-item'>
                      <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                        <span className='font-700 text-[14px] text-[#219653] sm:text-[30px]'>
                          {showMinute}
                        </span>
                      </div>
                      <p className='font-500 text-center text-[12px] leading-8 sm:text-[18px]'>
                        Minutes
                      </p>
                    </div>
                    <div className='countdown-item'>
                      <div className='countdown-number flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white sm:h-[100px] sm:w-[100px]'>
                        <span className='font-700 text-[14px] text-[#EF5DA8] sm:text-[30px]'>
                          {showSecound}
                        </span>
                      </div>
                      <p className='font-500 text-center text-[12px] leading-8 sm:text-[18px]'>
                        Seconds
                      </p>
                    </div>
                  </div>
                  <div className='countdown-title mb-4'>
                    <h1 className='text-qblack font-600 text-[44px]'>
                      WOO! Flash Sale
                    </h1>
                  </div>
                  <div className='inline-flex items-center space-x-2 border-b border-accent'>
                    <span className='font-600 text-sm leading-7 tracking-wide'>
                      Shop Now
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
              data-aos='fade-left'
              className='download-app h-[430px] flex-1 p-5 lg:h-full xl:p-12'
              style={{
                background: `url(${
                  counterbg ||
                  `${
                    process.env.NEXT_PUBLIC_URL
                  }/assets/images/download-app-cover.png`
                }) no-repeat`,
                backgroundSize: 'cover'
              }}
            >
              <div className='flex h-full flex-col justify-between'>
                <div className='get-app'>
                  <p className='font-600 text-qblack mb-3 text-[13px]'>
                    MOBILE APP VERSION
                  </p>
                  <h1 className='font-600 text-qblack mb-8 text-[30px] leading-10'>
                    Get Our
                    <span className='mx-2 border-b-2 border-red-500 text-red-500'>
                      Mobile App
                    </span>
                    <br /> It’s Make easy for you life !
                  </h1>
                  <div className='flex items-center space-x-5'>
                    <div>
                      <a href='#'>
                        <img
                          width='170'
                          height='69'
                          src={`${
                            process.env.NEXT_PUBLIC_URL
                          }/assets/images/play-store.png`}
                          alt=''
                        />
                      </a>
                    </div>
                    <div>
                      <a href='#'>
                        <img
                          width='170'
                          height='69'
                          src={`${
                            process.env.NEXT_PUBLIC_URL
                          }/assets/images/apple-store.png`}
                          alt=''
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='app-screen'>
                  <img
                    src={
                      appscreen ||
                      `${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/app-screen.png`
                    }
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
