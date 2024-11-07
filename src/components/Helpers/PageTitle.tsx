// Project Components Imports
import BreadcrumbCom from '@/components/BreadcrumbCom'

// Types Imports
import { PageTitleProps } from '@/types'

export default function PageTitle({
  title,
  subTitle,
  breadcrumb = []
}: PageTitleProps) {
  return (
    <div className='page-title-wrapper h-[173px] w-full bg-[#FFFAEF] py-10'>
      <div className='container-x mx-auto'>
        <div className='mb-5'>
          <BreadcrumbCom paths={breadcrumb} />
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <h1 className='text-3xl font-semibold text-gray-900'>{title}</h1>
          <h2 className='text-2xl font-semibold text-gray-900'>{subTitle}</h2>
        </div>
      </div>
    </div>
  )
}
