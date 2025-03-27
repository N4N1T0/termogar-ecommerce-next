import Facebook from '@/components/Helpers/icons/Facebook'
import Instagram from '@/components/Helpers/icons/Instagram'
import Youtube from '@/components/Helpers/icons/Youtube'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function TopBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full bg-gray-900 px-4 py-2 font-medium text-white',
        className
      )}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <div className='flex gap-2'>
          <Link
            href='https://www.instagram.com/termogar.es/'
            target='_blank'
            className='flex aspect-square size-5 items-center justify-center rounded-full bg-accent'
          >
            <Instagram className='hover-200 size-3 fill-gray-100 hover:fill-gray-900' />
          </Link>
          <Link
            href='https://es-es.facebook.com/termogar'
            target='_blank'
            className='flex aspect-square size-5 items-center justify-center rounded-full bg-accent'
          >
            <Facebook className='hover-200 size-3 fill-gray-100 hover:fill-gray-900' />
          </Link>
          <Link
            href='https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg'
            target='_blank'
            className='flex aspect-square size-5 items-center justify-center rounded-full bg-accent'
          >
            <Youtube className='hover-200 size-3 fill-gray-100 hover:fill-gray-900' />
          </Link>
          {process.env.NODE_ENV === 'development' && <p>Desarrollo</p>}
        </div>
        <div className='flex gap-2 text-center'>
          <span className='hidden animate-pulse font-semibold uppercase text-accent md:block'>
            ¿Necesitas ayuda?
          </span>
          <p className='text-xs md:text-sm'>
            Puedes usar nuestro Apartado de Atencion al Cliente pinchando:
          </p>
          <Link
            href='/servicio-al-cliente'
            className='hover-200 text-xs font-semibold uppercase hover:text-accent md:text-sm'
          >
            En este Enlace
          </Link>
        </div>
      </div>
    </div>
  )
}
