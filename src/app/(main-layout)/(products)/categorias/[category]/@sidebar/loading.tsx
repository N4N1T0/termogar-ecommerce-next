import { renderPulseDivs } from '@/lib/ui-utils'

const SidebarLoading = () => {
  return (
    <aside className='sticky top-0 m-4 hidden h-screen w-72 overflow-y-auto text-balance bg-white px-4 pt-10 md:block'>
      {renderPulseDivs(8, 'w-full rounded', 'h-20', 'sidebar-loading')}
    </aside>
  )
}

export default SidebarLoading
