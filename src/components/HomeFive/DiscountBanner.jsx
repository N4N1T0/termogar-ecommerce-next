export default function DiscountBanner({ className }) {
  return (
    <div
      className={`discount-banner relative h-[307px] w-full bg-cover ${
        className || ''
      }`}
      style={{
        background: `url(${
          process.env.NEXT_PUBLIC_URL
        }/assets/images/discount-banner-3.jpg) no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <div className='container-x relative mx-auto h-full'>
        <div className='thumb absolute -left-[140px] -top-[87px] h-[394px] w-[520px]'>
          <img
            src='/assets/images/discount-banner-3.1.png'
            alt=''
            className='h-full w-full object-contain'
          />
        </div>
        <div className='relative flex h-full w-full items-center justify-center xl:left-[100px]'>
          <div>
            <div data-aos='fade-up'>
              <h1 className='font-700 text-qblack mb-2 text-center text-xl sm:text-3xl'>
                Get <span className='mx-1 text-red-500'>20%</span> Off Discount
                Coupon
              </h1>
              <p className='font-400 text-center text-sm sm:text-[18px]'>
                by Subscribe our Newsletter
              </p>
            </div>
            <div
              data-aos='fade-right'
              className='mt-8 flex h-[54px] w-[300px] sm:w-[543px]'
            >
              <div className='text-qblack flex h-full flex-1 items-center space-x-2 bg-white pl-4 focus-within:text-accent'>
                <span>
                  <svg
                    width='17'
                    height='15'
                    viewBox='0 0 17 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15 14H2C1.4 14 1 13.6 1 13V2C1 1.4 1.4 1 2 1H15C15.6 1 16 1.4 16 2V13C16 13.6 15.6 14 15 14Z'
                      stroke='currentColor'
                      strokeMiterlimit='10'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M3 4L8.5 8.5L14 4'
                      stroke='currentColor'
                      strokeMiterlimit='10'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
                <input
                  type='email'
                  name='email'
                  className='placeholder:text-qblack text-qblack font-400 h-full w-full text-sm tracking-wider placeholder:text-xs focus:outline-none'
                  placeholder='EMAIL ADDRESS'
                />
              </div>
              <button
                type='button'
                className='bg-qh5-bwhite font-600 h-full w-[80px] text-sm sm:w-[158px]'
              >
                Get the Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
