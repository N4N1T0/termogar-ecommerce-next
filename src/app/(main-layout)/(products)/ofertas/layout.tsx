const CategoriasLayout = ({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) => {
  return (
    <main className='relative mx-auto w-full max-w-screen-2xl md:flex'>
      {sidebar}
      {children}
    </main>
  )
}

export default CategoriasLayout
