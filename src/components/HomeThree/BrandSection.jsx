export default function BrandSection({ className, sectionTitle, type }) {
  return (
    <div data-aos='fade-up' className={`w-full ${className || ''}`}>
      <div className='container-x mx-auto'>
        {type !== 3 && (
          <div className='section-title mb-5 flex items-center justify-between'>
            <div>
              <h1 className='font-600 text-xl text-gray-900 sm:text-3xl'>
                {sectionTitle}
              </h1>
            </div>
          </div>
        )}

        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-1.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-2.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-3.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-4.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-5.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-6.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-7.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-8.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/assets/images/brand-9.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${
                  process.env.NEXT_PUBLIC_URL
                }/assets/images/brand-10.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${
                  process.env.NEXT_PUBLIC_URL
                }/assets/images/brand-11.png`}
                alt='logo'
              />
            </div>
          </div>
          <div className='item'>
            <div className='border-primarygray flex h-[130px] w-full items-center justify-center border bg-white'>
              <img
                src={`${
                  process.env.NEXT_PUBLIC_URL
                }/assets/images/brand-12.png`}
                alt='logo'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
