import { cn } from '@/lib/utils'
import { BreadcrumbProps } from '@/types'
import Link from 'next/link'

export default function BreadcrumbCom({
  paths = [{ name: 'home', path: '/' }],
  className = ''
}: {
  paths: BreadcrumbProps[] | null
  className?: string
}) {
  return (
    <>
      {paths && paths.length > 0 && (
        <div
          className={cn(
            'breadcrumb-wrapper font-400 text-qblack mb-[23px] text-[13px]',
            className
          )}
        >
          {paths.map((path) => {
            if (!path?.name || !path.path) return null
            return (
              <span key={path.name}>
                <Link href={path.path}>
                  <span className='mx-1 capitalize hover:underline'>
                    {path.name}
                  </span>
                </Link>
                <span className='sperator'>/</span>
              </span>
            )
          })}
        </div>
      )}
    </>
  )
}
