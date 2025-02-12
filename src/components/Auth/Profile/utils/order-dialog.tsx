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
import Link from 'next/link'

const OrderDialog = ({
  orderInfo,
  children
}: {
  orderInfo: GET_ORDERS_BY_USER_IDResult[number]
  children: React.ReactNode
}) => {
  const {
    id,
    status,
    totalAmount,
    products,
    shippingAddress,
    expectedDeliveryDate,
    paymentMethod,
    purchaseDate,
    currierLink
  } = orderInfo

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='rounded-none border-none bg-gray-100 sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-xl'>
            Detalles del Pedido - {id.split('-')[0]}
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
                {products?.map(({ product, quantity }) => (
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
                  <dt className='font-medium'>Link de Seguimiento:</dt>
                  {currierLink && (
                    <dd>
                      <Link
                        href={currierLink}
                        className='underline hover:text-accent'
                        target='_blank'
                      >
                        Aquí
                      </Link>
                    </dd>
                  )}
                  <dt className='font-medium'>Fecha de Envío Esperada:</dt>
                  <dd>{expectedDeliveryDate}</dd>
                  <dt className='font-medium'>Método de Pago:</dt>
                  <dd>{paymentMethod}</dd>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <dt className='font-medium'>Fecha de Compra:</dt>
                  <dd>{new Date(purchaseDate || '').toLocaleString()}</dd>
                  <dt className='font-medium'>Monto Total:</dt>
                  <dd>{eurilize(totalAmount || 0)}</dd>
                  <dt className='font-medium'>Iva:</dt>
                  <dd>{eurilize((totalAmount && totalAmount * 0.21) || 0)}</dd>
                  <dt className='font-medium'>Status:</dt>
                  <dd>{status}</dd>
                </div>
              </dl>
            </div>
            <hr className='my-4 border-t border-gray-200' />
            <div>
              <h3 className='mb-2 text-lg font-semibold text-accent'>
                Dirección de Envío
              </h3>
              <address className='text-sm not-italic'>
                <p>{shippingAddress?.firstName}</p>
                <p>{shippingAddress?.address1}</p>
                {shippingAddress?.address2 && (
                  <p>{shippingAddress?.address2}</p>
                )}
                <p>
                  {shippingAddress?.city}, {shippingAddress?.state}{' '}
                  {shippingAddress?.postcode}
                </p>
                {shippingAddress?.email && (
                  <p>Email: {shippingAddress?.email}</p>
                )}
                {shippingAddress?.phone && (
                  <p>Teléfono: {shippingAddress?.phone}</p>
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
