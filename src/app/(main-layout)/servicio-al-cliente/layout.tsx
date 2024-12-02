const ServiceClientLayout = async ({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) => {
  return (
    <main className='container-x relative mx-auto flex w-full'>
      {sidebar}
      {children}
    </main>
  )
}

export default ServiceClientLayout
