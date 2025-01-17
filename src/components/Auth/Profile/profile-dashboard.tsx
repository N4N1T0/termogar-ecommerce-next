// * ASSETS IMPORTS
import { OrderTab, ProfileTab } from '@/components/Auth/Profile/tabs'

// * UTILS IMPORTS
import {
  GET_ORDERS_BY_USER_IDResult,
  GET_USER_INFOResult
} from '@/types/sanity'
import PasswordTab from './tabs/password-tab'

const ProfileDashboard = ({
  user,
  activeTab,
  orders
}: {
  user: GET_USER_INFOResult
  activeTab: string | string[] | undefined
  orders: GET_ORDERS_BY_USER_IDResult
}) => {
  return (
    <div className='relative flex w-full gap-10 px-10 py-10'>
      <div className='w-full flex-1'>
        {activeTab === 'profile' ? (
          <ProfileTab user={user} />
        ) : activeTab === 'order' ? (
          <OrderTab orders={orders} />
        ) : activeTab === 'password' ? (
          <PasswordTab user={user} />
        ) : (
          <ProfileTab user={user} />
        )}
      </div>
    </div>
  )
}

export default ProfileDashboard
