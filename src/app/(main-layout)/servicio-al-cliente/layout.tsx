const ServiceClientLayout = async ({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) => {
  return (
    <main className='relative flex w-full'>
      {sidebar}
      {children}
    </main>
  )
}

export default ServiceClientLayout
