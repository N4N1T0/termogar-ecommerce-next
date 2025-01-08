import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function TopBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative bg-gray-900 px-4 py-2 font-medium text-white',
        className
      )}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-end gap-2'>
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
  )
}
