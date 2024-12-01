const CategoriasLayout = ({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) => {
  return (
    <main className='relative mx-auto flex w-full max-w-screen-2xl'>
      {sidebar}
      {children}
    </main>
  )
}

export default CategoriasLayout
