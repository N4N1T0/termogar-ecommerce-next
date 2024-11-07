import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import datas from '../../../data/products.json'
import BreadcrumbCom from '../../BreadcrumbCom'
import Layout from '../../Partials/Layout'
import IcoAdress from './icons/IcoAdress'
import IcoCart from './icons/IcoCart'
import IcoDashboard from './icons/IcoDashboard'
import IcoLogout from './icons/IcoLogout'
import IcoLove from './icons/IcoLove'
import IcoPassword from './icons/IcoPassword'
import IcoPayment from './icons/IcoPayment'
import IcoPeople from './icons/IcoPeople'
import IcoReviewHand from './icons/IcoReviewHand'
import IcoSupport from './icons/IcoSupport'
import AddressesTab from './tabs/AddressesTab'
import Dashboard from './tabs/Dashboard'
import OrderTab from './tabs/OrderTab'
import PasswordTab from './tabs/PasswordTab'
import Payment from './tabs/Payment'
import ProfileTab from './tabs/ProfileTab'
import ReviewTab from './tabs/ReviewTab'
import SupportTab from './tabs/SupportTab'
import WishlistTab from './tabs/WishlistTab'

export default function Profile() {
  const [switchDashboard, setSwitchDashboard] = useState(false)
  const location = useLocation()
  const getHashContent = location.hash.split('#')
  const [active, setActive] = useState('dashboard')
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : 'dashboard'
    )
  }, [getHashContent])
  return (
    <Layout childrenClasses='pt-0 pb-0'>
      <div className='profile-page-wrapper w-full'>
        <div className='container-x mx-auto'>
          <div className='my-10 w-full'>
            <BreadcrumbCom
              paths={[
                { name: 'home', path: '/' },
                { name: 'profile', path: '/profile' }
              ]}
            />
            <div className='w-full bg-white px-10 py-9'>
              <div className='title-area flex w-full items-center justify-between'>
                <h1 className='text-qblack text-[22px] font-bold'>
                  Your Dashboard
                </h1>
                <div className='switch-dashboard flex items-center space-x-3'>
                  <p className='text-base text-gray-500'>Switch Dashboard</p>
                  <button
                    onClick={() => setSwitchDashboard(!switchDashboard)}
                    type='button'
                    className='relative h-[31px] w-[73px] rounded-full border border-[#D9D9D9]'
                  >
                    <div
                      className={`bg-qblack absolute top-[3px] h-[23px] w-[23px] rounded-full transition-all duration-300 ease-in-out ${
                        switchDashboard ? 'left-[44px]' : 'left-[4px]'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
              <div className='profile-wrapper mt-8 flex w-full space-x-10'>
                <div className='border-[rgba(0, 0, 0, 0.1)] min-h-[600px] w-[236px] border-r'>
                  <div className='flex flex-col space-y-10'>
                    <div className='item group'>
                      <Link to='/profile#dashboard'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className='text-base font-normal'>
                            Dashbaord
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#profile'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoPeople />
                          </span>
                          <span className='text-base font-normal'>
                            Parsonal Info
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className='item group'>
                      <Link to='/profile#payment'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoPayment />
                          </span>
                          <span className='text-base font-normal'>
                            Payment Method
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#order'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoCart />
                          </span>
                          <span className='text-base font-normal'>Order</span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#wishlist'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoLove />
                          </span>
                          <span className='text-base font-normal'>
                            Wishlist
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#address'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoAdress />
                          </span>
                          <span className='text-base font-normal'>Address</span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#review'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoReviewHand />
                          </span>
                          <span className='text-base font-normal'>Reviews</span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#password'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoPassword />
                          </span>
                          <span className='text-base font-normal'>
                            Change Password
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#support'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoSupport />
                          </span>
                          <span className='text-base font-normal'>
                            Support Ticket
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='item group'>
                      <Link to='/profile#profile'>
                        <div className='hover:text-qblack flex items-center space-x-3 text-gray-500'>
                          <span>
                            <IcoLogout />
                          </span>
                          <span className='text-base font-normal'>Logoout</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='item-body dashboard-wrapper w-full'>
                    {active === 'dashboard' ? (
                      <Dashboard />
                    ) : active === 'profile' ? (
                      <>
                        <ProfileTab />
                      </>
                    ) : active === 'payment' ? (
                      <>
                        <Payment />
                      </>
                    ) : active === 'order' ? (
                      <>
                        <OrderTab />
                      </>
                    ) : active === 'wishlist' ? (
                      <>
                        <WishlistTab />
                      </>
                    ) : active === 'address' ? (
                      <>
                        <AddressesTab />
                      </>
                    ) : active === 'password' ? (
                      <>
                        <PasswordTab />
                      </>
                    ) : active === 'support' ? (
                      <>
                        <SupportTab />
                      </>
                    ) : active === 'review' ? (
                      <>
                        <ReviewTab products={datas.products} />
                      </>
                    ) : (
                      ''
                    )}
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
