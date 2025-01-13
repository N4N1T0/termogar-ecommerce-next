// * NEXT.JS IMPORTS
import Image from 'next/image'

// * ASSETS IMPORTS
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

// * UTILS IMPORTS
import { GET_ORDERS_BY_USER_IDResult } from '@/types/sanity'
import { PlaceholderSquare } from '@/assets'
import { eurilize } from '@/lib/utils'

const OrderDialog = ({
  orderInfo,
  children
}: {
  orderInfo: GET_ORDERS_BY_USER_IDResult[number]
  children: React.ReactNode
}) => {
  console.log('🚀 ~ orderInfo:', orderInfo)
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='rounded-none border-none bg-gray-100 sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-xl'>
            Detalles del Pedido - {orderInfo.id.split('-')[0]}
          </DialogTitle>
          <DialogDescription className='sr-only'>
            Detalles del Pedido
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[60vh] pr-4'>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-2 text-lg font-semibold text-accent'>
                Productos
              </h3>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                {orderInfo?.products?.map(({ product, quantity }) => (
                  <div
                    key={product?.id}
                    className='flex flex-col items-center space-y-2 border border-accent p-2'
                  >
                    <Image
                      src={product?.featuredMedia.url || PlaceholderSquare}
                      alt={product?.title || 'Sin Nombre'}
                      title={product?.title || 'Sin Nombre'}
                      width={80}
                      height={80}
                      placeholder='blur'
                      blurDataURL={
                        product?.featuredMedia.blur ||
                        PlaceholderSquare.blurDataURL
                      }
                      className='rounded-md object-cover'
                    />
                    <div className='space-y-1 text-center'>
                      <p className='text-sm font-medium'>{product?.title}</p>
                      <p className='text-xs text-gray-500'>
                        Cantidad: {quantity}
                      </p>
                      <p className='text-sm font-semibold'>
                        {eurilize(product?.sale?.price || product?.price || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className='my-4 border-t border-gray-200' />
            <div>
              <h3 className='mb-2 text-lg font-semibold text-accent'>
                Información del Pedido
              </h3>
              <dl className='flex w-full items-center justify-between'>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  {/* TODO: Add tracking link */}
                  <dt className='font-medium'>Link de Seguimiento:</dt>
                  <dd>{orderInfo.currierCode}</dd>
                  <dt className='font-medium'>Fecha de Envío Esperada:</dt>
                  <dd>{orderInfo.expectedDeliveryDate}</dd>
                  <dt className='font-medium'>Método de Pago:</dt>
                  <dd>{orderInfo.paymentMethod}</dd>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <dt className='font-medium'>Fecha de Compra:</dt>
                  <dd>
                    {new Date(orderInfo.purchaseDate || '').toLocaleString()}
                  </dd>
                  <dt className='font-medium'>Monto Total:</dt>
                  <dd>{eurilize(orderInfo.totalAmount || 0)}</dd>
                  <dt className='font-medium'>Iva:</dt>
                  <dd>
                    {eurilize(
                      (orderInfo.totalAmount && orderInfo.totalAmount * 0.21) ||
                        0
                    )}
                  </dd>
                  <dt className='font-medium'>Status:</dt>
                  <dd>{orderInfo.status}</dd>
                </div>
              </dl>
            </div>
            <hr className='my-4 border-t border-gray-200' />
            <div>
              <h3 className='mb-2 text-lg font-semibold text-accent'>
                Dirección de Envío
              </h3>
              <address className='text-sm not-italic'>
                <p>{orderInfo?.shippingAddress?.firstName}</p>
                <p>{orderInfo?.shippingAddress?.address1}</p>
                {orderInfo?.shippingAddress?.address2 && (
                  <p>{orderInfo?.shippingAddress?.address2}</p>
                )}
                <p>
                  {orderInfo?.shippingAddress?.city},{' '}
                  {orderInfo?.shippingAddress?.state}{' '}
                  {orderInfo?.shippingAddress?.postcode}
                </p>
                {orderInfo?.shippingAddress?.email && (
                  <p>Email: {orderInfo?.shippingAddress?.email}</p>
                )}
                {orderInfo?.shippingAddress?.phone && (
                  <p>Teléfono: {orderInfo?.shippingAddress?.phone}</p>
                )}
              </address>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDialog
