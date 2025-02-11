import React from 'react'
import { renderPulseDivs } from '@/lib/ui-utils'

const CostumerServiceSidebarLoading = () => {
  return (
    <div className='sticky top-0 m-4 h-screen w-10 animate-pulse divide-y overflow-y-auto bg-white px-4 pt-10 text-black'>
      <nav aria-label='Customer Service Navigation'>
        {renderPulseDivs(1, 'w-full', 'h-12', 'header')}
        {renderPulseDivs(2, 'w-full', 'h-10', 'link')}
        {renderPulseDivs(8, 'w-full', 'h-5', 'link-item')}
      </nav>
    </div>
  )
}

export default CostumerServiceSidebarLoading
