// * ASSETS IMPORTS
import CostumerServiceSidebar from '@/components/CostumerService/sidebar'

const ServiceClientLayout = async ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { slug } = await params
  return (
    <main className='relative flex w-full'>
      <CostumerServiceSidebar slug={slug} />
      {children}
    </main>
  )
}

export default ServiceClientLayout
