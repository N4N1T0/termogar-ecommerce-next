import { BreadcrumbProps } from '@/types'
import Link from 'next/link'

export default function BreadcrumbCom({
  paths = [{ name: 'home', path: '/' }]
}: {
  paths: BreadcrumbProps[]
}) {
  return (
    <>
      {paths && paths.length > 0 && (
        <div className='breadcrumb-wrapper font-400 text-qblack mb-[23px] text-[13px]'>
          {paths.map((path) => (
            <span key={path.name}>
              <Link href={path.path}>
                <span className='mx-1 capitalize hover:underline'>
                  {path.name}
                </span>
              </Link>
              <span className='sperator'>/</span>
            </span>
          ))}
        </div>
      )}
    </>
  )
}
