const CategoriasLayout = ({
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

export default CategoriasLayout
