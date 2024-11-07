import InputCom from '../Helpers/InputCom'
import PageTitle from '../Helpers/PageTitle'
import Layout from '../Partials/Layout'
import Thumbnail from './Thumbnail'

export default function TrackingOrder() {
  return (
    <Layout childrenClasses='pt-0 pb-0'>
      <div className='tracking-page-wrapper w-full'>
        <div className='page-title mb-[40px]'>
          <PageTitle
            title='Track Order'
            breadcrumb={[
              { name: 'home', path: '/' },
              { name: 'Track Order', path: '/tracking-order' }
            ]}
          />
        </div>
        <div className='content-wrapper mb-[40px] w-full'>
          <div className='container-x mx-auto'>
            <h1 className='text-qblack text-[22px] font-semibold leading-9'>
              Track Your Order
            </h1>
            <p className='text-gray-500two mb-5 text-[15px] leading-8'>
              Enter your order taracking number and your secreet id.
            </p>
            <div className='w-full items-center bg-white px-5 py-[23px] lg:flex lg:px-[30px]'>
              <div className='w-full lg:w-[642px]'>
                <div className='mb-3'>
                  <InputCom
                    placeholder='Order Number'
                    label='Order Tracking Number*'
                    inputClasses='w-full h-[50px]'
                  />
                </div>
                <div className='mb-[30px]'>
                  <InputCom
                    placeholder='23/09/2022'
                    label='Delivery Date'
                    inputClasses='w-full h-[50px]'
                  />
                </div>

                <a href='#'>
                  <div className='black-btn flex h-[50px] w-[142px] items-center justify-center'>
                    <span>Track Now</span>
                  </div>
                </a>
              </div>
              <div className='mt-5 flex flex-1 justify-center lg:mt-0'>
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
