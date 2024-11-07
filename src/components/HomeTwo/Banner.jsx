import { Link } from 'react-router-dom'

export default function Banner({ className }) {
  return (
    <>
      <div className={`w-full ${className || ''}`}>
        <div className='container-x mx-auto'>
          <div className='main-wrapper w-full'>
            <div className='banner-card mb-[30px] xl:flex xl:h-[600px] xl:space-x-[30px]'>
              <div data-aos='fade-right' className='h-full w-full xl:w-1/2'>
                <Link to='/single-product'>
                  <picture>
                    <source
                      media='(min-width:1025px)'
                      srcSet={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/banner-1.1.png`}
                    />
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/banner-2.1.png`}
                      alt=''
                      className='h-auto w-full max-w-full object-cover'
                    />
                  </picture>
                </Link>
              </div>
              <div
                data-aos='fade-left'
                className='flex h-full w-1/2 flex-row xl:flex-col xl:space-y-[30px]'
              >
                <div className='w-full'>
                  <Link to='/single-product'>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_URL
                      }/assets/images/banner-2.2.png`}
                      alt=''
                      className='h-full w-full'
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
