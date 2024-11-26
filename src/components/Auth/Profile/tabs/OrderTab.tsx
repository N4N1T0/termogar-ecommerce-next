// * ASSETS IMPORTS
import OrderDialog from '@/components/Auth/Profile/utils/order-dialog'

// * UTILS IMPORTS
import { GET_ORDERS_BY_USER_IDResult } from '@/types/sanity'
import { getStatusColor, eurilize } from '@/lib/utils'

const OrderTab = async ({
  orders
}: {
  orders: GET_ORDERS_BY_USER_IDResult
}) => {
  return (
    <div className='relative w-full overflow-x-auto sm:rounded-lg'>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
        <tbody>
          <tr className='default-border-bottom whitespace-nowrap border-b px-2 text-base text-gray-500'>
            <td className='block whitespace-nowrap py-4 text-center'>Pedido</td>
            <td className='whitespace-nowrap py-4 text-center'>Fecha</td>
            <td className='whitespace-nowrap py-4 text-center'>Estado</td>
            <td className='whitespace-nowrap py-4 text-center'>Monto</td>
            <td className='whitespace-nowrap py-4 text-center'>Acción</td>
          </tr>

          {orders.map((order) => (
            <tr key={order.id} className='border-b bg-white hover:bg-gray-50'>
              <td className='py-4 text-center'>
                <span className='text-lg font-medium text-gray-500'>
                  #{order.id.split('-')[0]}
                </span>
              </td>
              <td className='px-2 py-4 text-center'>
                <span className='whitespace-nowrap text-base text-gray-500'>
                  {new Date(order.purchaseDate || '').toLocaleDateString(
                    'es-ES'
                  )}
                </span>
              </td>
              <td className='px-2 py-4 text-center'>
                <span
                  className='p-2 text-sm text-gray-100'
                  style={{
                    background: getStatusColor(order.status || 'pendiente')
                  }}
                >
                  {order.status
                    ? order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1)
                    : 'Sin estado'}
                </span>
              </td>
              <td className='px-2 py-4 text-center'>
                <span className='text-qblack whitespace-nowrap px-2 text-base'>
                  {eurilize(order.totalAmount || 0)}
                </span>
              </td>
              <td className='py-4 text-center'>
                <OrderDialog orderInfo={order}>
                  <button
                    type='button'
                    className='text-qblack hover-200 h-[46px] w-[116px] bg-accent font-bold text-gray-100 hover:text-gray-400'
                  >
                    Ver detalles
                  </button>
                </OrderDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTab
