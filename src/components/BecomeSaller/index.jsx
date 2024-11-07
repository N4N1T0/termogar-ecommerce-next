import { useRef, useState } from 'react'
import InputCom from '../Helpers/InputCom'
import PageTitle from '../Helpers/PageTitle'
import Layout from '../Partials/Layout'
import { Link } from 'react-router-dom'

export default function BecomeSaller() {
  const [profileImg, setProfileImg] = useState(null)
  const [logoImg, setLogoImg] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  // logo img
  const logoImgInput = useRef(null)
  const browseLogoImg = () => {
    logoImgInput.current.click()
  }
  const logoImgChangHandler = (e) => {
    if (e.target.value !== '') {
      const imgReader = new FileReader()
      imgReader.onload = (event) => {
        setLogoImg(event.target.result)
      }
      imgReader.readAsDataURL(e.target.files[0])
    }
  }
  // profile img
  const profileImgInput = useRef(null)
  const browseProfileImg = () => {
    profileImgInput.current.click()
  }
  const profileImgChangHandler = (e) => {
    if (e.target.value !== '') {
      const imgReader = new FileReader()
      imgReader.onload = (event) => {
        setProfileImg(event.target.result)
      }
      imgReader.readAsDataURL(e.target.files[0])
    }
  }
  // cover img
  const coverImgInput = useRef(null)
  const browseCoverImg = () => {
    coverImgInput.current.click()
  }
  const coverImgChangHandler = (e) => {
    if (e.target.value !== '') {
      const imgReader = new FileReader()
      imgReader.onload = (event) => {
        setCoverImg(event.target.result)
      }
      imgReader.readAsDataURL(e.target.files[0])
    }
  }
  return (
    <Layout childrenClasses='pt-0 pb-0'>
      <div className='become-saller-wrapper w-full'>
        <div className='title mb-10'>
          <PageTitle
            title='Seller Application'
            breadcrumb={[
              { name: 'home', path: '/' },
              { name: 'Become Saller', path: '/become-saller' }
            ]}
          />
        </div>
        <div className='content-wrapper mb-10 w-full'>
          <div className='container-x mx-auto'>
            <div className='w-full bg-white p-3 sm:p-[30px]'>
              <div className='flex flex-col-reverse xl:flex-row xl:space-x-11'>
                <div className='xl:w-[824px]'>
                  <div className='title mb-4 w-full'>
                    <h1 className='text-qblack mb-1 text-[22px] font-semibold'>
                      Seller Information
                    </h1>
                    <p className='text-gray-500two text-[15px]'>
                      Fill the form below or write us .We will help you as soon
                      as possible.
                    </p>
                  </div>
                  <div className='input-area'>
                    <div className='mb-5 flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
                      <InputCom
                        placeholder='Demo Name'
                        label='Frist Name*'
                        name='fname'
                        type='text'
                        inputClasses='h-[50px]'
                      />

                      <InputCom
                        placeholder='Demo Name'
                        label='Last Name*'
                        name='lname'
                        type='text'
                        inputClasses='h-[50px]'
                      />
                    </div>
                    <div className='mb-5 flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
                      <InputCom
                        placeholder='Demo@gmail.com'
                        label='Email Address*'
                        name='email'
                        type='email'
                        inputClasses='h-[50px]'
                      />

                      <InputCom
                        placeholder='0213 *********'
                        label='Phone*'
                        name='phone'
                        type='text'
                        inputClasses='h-[50px]'
                      />
                    </div>

                    <div className='input-item mb-5'>
                      <h6 className='input-label mb-2 block text-[13px] font-normal capitalize text-gray-500'>
                        Country*
                      </h6>
                      <div className='mb-2 flex h-[50px] w-full items-center justify-between border border-[#EDEDED] px-5'>
                        <span className='text-gray-500two text-[13px]'>
                          Select Country
                        </span>
                        <span>
                          <svg
                            width='11'
                            height='7'
                            viewBox='0 0 11 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                              fill='#222222'
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className='input-item mb-5'>
                      <InputCom
                        placeholder='Your address Here'
                        label='Address*'
                        name='address'
                        type='text'
                        inputClasses='h-[50px]'
                      />
                    </div>
                  </div>

                  {/* ============================================================== */}
                  <div className='title mb-4 w-full'>
                    <h1 className='text-qblack mb-1 text-[22px] font-semibold'>
                      Shop Information
                    </h1>
                    <p className='text-gray-500two text-[15px]'>
                      Fill the form below or write us .We will help you as soon
                      as possible.
                    </p>
                  </div>
                  <div className='input-area'>
                    <div className='mb-5'>
                      <InputCom
                        placeholder='Demo Name'
                        label='Shop Name*'
                        name='shopname'
                        type='text'
                        inputClasses='h-[50px]'
                      />
                    </div>
                    <div className='mb-5'>
                      <InputCom
                        placeholder='Your address Here'
                        label='Address*'
                        name='shopaddress'
                        type='text'
                        inputClasses='h-[50px]'
                      />
                    </div>
                    <div className='mb-[30px] flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
                      <InputCom
                        placeholder='● ● ● ● ● ●'
                        label='Password*'
                        name='password'
                        type='password'
                        inputClasses='h-[50px]'
                      />

                      <InputCom
                        placeholder='● ● ● ● ● ●'
                        label='Re-enter Password*'
                        name='repassword'
                        type='password'
                        inputClasses='h-[50px]'
                      />
                    </div>

                    <div className='signin-area mb-3'>
                      <div className='flex justify-center'>
                        <button
                          type='button'
                          className='black-btn bg-purple flex h-[50px] w-[490px] items-center justify-center text-sm font-semibold text-white'
                        >
                          <span>Create Seller Account</span>
                        </button>
                      </div>
                    </div>

                    <div className='signup-area flex justify-center'>
                      <p className='text-gray-500two text-sm font-normal'>
                        Alrady have an Account?
                        <Link to='/login' className='text-qblack ml-2'>
                          Log In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mb-10 flex-1 xl:mb-0'>
                  <div className='update-profile mb-9 w-full'>
                    <h1 className='text-qblack mb-2 flex items-center text-xl font-bold tracking-wide'>
                      Update Profile
                      <span className='ml-1'>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z'
                            fill='#374557'
                            fillOpacity='0.6'
                          />
                        </svg>
                      </span>
                    </h1>
                    <p className='text-gray-500two mb-5 text-sm'>
                      Profile of at least Size
                      <span className='text-qblack ml-1'>300x300</span>. Gifs
                      work too.
                      <span className='text-qblack ml-1'>Max 5mb</span>.
                    </p>
                    <div className='flex justify-start xl:justify-center'>
                      <div className='relative'>
                        <img
                          src={
                            profileImg ||
                            `${
                              process.env.NEXT_PUBLIC_URL
                            }/assets/images/edit-profileimg.jpg`
                          }
                          alt=''
                          className='h-[199px] w-[199px] overflow-hidden rounded-full object-cover sm:h-[198px] sm:w-[198px]'
                        />
                        <input
                          ref={profileImgInput}
                          onChange={(e) => profileImgChangHandler(e)}
                          type='file'
                          className='hidden'
                        />
                        <div
                          onClick={browseProfileImg}
                          className='absolute bottom-7 right-[105px] h-[32px] w-[32px] cursor-pointer rounded-full bg-[#F539F8] hover:bg-[#F539F8] sm:right-0'
                        >
                          <svg
                            width='32'
                            height='32'
                            viewBox='0 0 32 32'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z'
                              fill='white'
                            />
                            <path
                              d='M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z'
                              fill='white'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='update-logo mb-9 w-full'>
                    <h1 className='text-qblack mb-2 flex items-center text-xl font-bold tracking-wide'>
                      Update Logo
                      <span className='ml-1'>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z'
                            fill='#374557'
                            fillOpacity='0.6'
                          />
                        </svg>
                      </span>
                    </h1>
                    <p className='text-gray-500two mb-5 text-sm'>
                      Profile of at least Size
                      <span className='text-qblack ml-1'>300x300</span>. Gifs
                      work too.
                      <span className='text-qblack ml-1'>Max 5mb</span>.
                    </p>
                    <div className='flex justify-start xl:justify-center'>
                      <div className='relative'>
                        <img
                          src={
                            logoImg ||
                            `${
                              process.env.NEXT_PUBLIC_URL
                            }/assets/images/edit-logoimg.jpg`
                          }
                          alt=''
                          className='h-[199px] w-[199px] overflow-hidden rounded-full object-cover sm:h-[198px] sm:w-[198px]'
                        />
                        <input
                          ref={logoImgInput}
                          onChange={(e) => logoImgChangHandler(e)}
                          type='file'
                          className='hidden'
                        />
                        <div
                          onClick={browseLogoImg}
                          className='absolute bottom-7 right-[105px] h-[32px] w-[32px] cursor-pointer rounded-full bg-[#F539F8] hover:bg-[#F539F8] sm:right-0'
                        >
                          <svg
                            width='32'
                            height='32'
                            viewBox='0 0 32 32'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z'
                              fill='white'
                            />
                            <path
                              d='M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z'
                              fill='white'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='update-cover w-full'>
                    <h1 className='text-qblack mb-2 flex items-center text-xl font-bold tracking-wide'>
                      Update Cover
                      <span className='ml-1'>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z'
                            fill='#374557'
                            fillOpacity='0.6'
                          />
                        </svg>
                      </span>
                    </h1>
                    <p className='text-gray-500two mb-5 text-sm'>
                      Cover of at least Size
                      <span className='text-qblack ml-1'>1170x920</span>.
                    </p>
                    <div className='flex justify-center'>
                      <div className='relative w-full'>
                        <img
                          src={
                            coverImg ||
                            `${
                              process.env.NEXT_PUBLIC_URL
                            }/assets/images/edit-coverimg.jpg`
                          }
                          alt=''
                          className='h-[120px] w-full overflow-hidden rounded-lg object-cover'
                        />
                        <input
                          ref={coverImgInput}
                          onChange={(e) => coverImgChangHandler(e)}
                          type='file'
                          className='hidden'
                        />
                        <div
                          onClick={browseCoverImg}
                          className='absolute -bottom-4 right-4 h-[32px] w-[32px] cursor-pointer rounded-full bg-[#F539F8] hover:bg-[#F539F8]'
                        >
                          <svg
                            width='32'
                            height='32'
                            viewBox='0 0 32 32'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z'
                              fill='white'
                            />
                            <path
                              d='M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z'
                              fill='white'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
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
