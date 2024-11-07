import Accodion from '../Helpers/Accodion'
import InputCom from '../Helpers/InputCom'
import PageTitle from '../Helpers/PageTitle'
import Layout from '../Partials/Layout'

export default function Faq() {
  return (
    <Layout childrenClasses='pt-0 pb-0'>
      <div className='faq-page-wrapper mb-10 w-full'>
        <div className='page-title w-full'>
          <PageTitle
            title='Frequently Asked Questions'
            breadcrumb={[
              { name: 'home', path: '/' },
              { name: 'FAQ', path: '/faq' }
            ]}
          />
        </div>
      </div>
      <div className='contact-wrapper mb-10 w-full'>
        <div className='container-x mx-auto'>
          <div className='main-wrapper w-full lg:flex lg:space-x-[30px]'>
            <div className='mb-10 w-full lg:mb-0 lg:w-1/2'>
              <h1 className='text-qblack mb-4 text-[22px] font-bold'>
                Frequently asked questions
              </h1>
              <div className='flex flex-col justify-between space-y-7'>
                <Accodion
                  title='01. How does information technology work?'
                  des='There are many variations of passages of Lorem Ipsum available into the 
but the majority have suffered alteration in some form, by injecte find to a
humour, or randomised words'
                />
                <Accodion
                  init
                  title='02. How can I become IT manager?'
                  des='There are many variations of passages of Lorem Ipsum available into the 
but the majority have suffered alteration in some form, by injecte find to a
humour, or randomised words'
                />
                <Accodion
                  title='03. What are the latest trends in IT?'
                  des='There are many variations of passages of Lorem Ipsum available into the 
but the majority have suffered alteration in some form, by injecte find to a
humour, or randomised words'
                />
                <Accodion
                  title='04. How long should a business plan be?'
                  des='There are many variations of passages of Lorem Ipsum available into the 
but the majority have suffered alteration in some form, by injecte find to a
humour, or randomised words'
                />
                <Accodion
                  title='05. How work the support policy?'
                  des='There are many variations of passages of Lorem Ipsum available into the 
but the majority have suffered alteration in some form, by injecte find to a
humour, or randomised words'
                />
              </div>
            </div>
            <div className='flex-1'>
              <div className='bg-white p-5 sm:p-10'>
                <div className='title flex flex-col items-center'>
                  <h1 className='text-qblack text-xl font-bold lg:text-[34px]'>
                    Have Any Qustion
                  </h1>
                  <span className='-mt-5 block'>
                    <svg
                      width='354'
                      height='30'
                      viewBox='0 0 354 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1'
                        stroke='#FFBB38'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </span>
                </div>
                <div className='inputs mt-5'>
                  <div className='mb-4'>
                    <InputCom
                      label='Frist Name*'
                      placeholder='Demo Name'
                      name='first_name'
                      inputClasses='h-[50px]'
                    />
                  </div>
                  <div className='mb-4'>
                    <InputCom
                      label='Email Address*'
                      placeholder='info@quomodosoft.com'
                      name='email'
                      inputClasses='h-[50px]'
                    />
                  </div>
                  <div className='mb-5'>
                    <h6 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
                      Message*
                    </h6>
                    <textarea
                      placeholder='Type your message here'
                      className='border-gray-500-border h-[105px] w-full border p-3 placeholder:text-sm focus:outline-none focus:ring-0'
                    ></textarea>
                  </div>
                  <div>
                    <a href='#'>
                      <div className='black-btn flex h-[50px] w-full items-center justify-center text-sm font-semibold'>
                        <span>Send Now</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
