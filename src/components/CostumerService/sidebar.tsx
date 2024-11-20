import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_SIDEBAR_MENU } from '@/sanity/lib/queries'

const MATCH_URL = 'servicio-de-atencion-al-cliente'

const CostumerServiceSidebar = async ({
  slug
}: {
  slug: string | string[] | undefined
}) => {
  const searchedPages = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_SIDEBAR_MENU
  )

  const costumerServicesPages = searchedPages?.filter((page) => {
    return page.link?.split('/').includes(MATCH_URL)
  })

  const notCostumerServicesPages = searchedPages?.filter((page) => {
    return !page.link?.split('/').includes(MATCH_URL)
  })

  // TODO: GROUP ????

  return (
    <aside className='sticky top-0 h-full w-64 text-balance border-r border-gray-200 bg-gray-100 p-4'>
      <nav aria-label='Customer Service Navigation' className='overflow-y-auto'>
        <h2 className='mb-4 text-lg font-semibold'>
          Servicio de Atencion al cliente
        </h2>

        <Accordion type='single' collapsible className='mb-4'>
          <AccordionItem value='links-de-ayuda'>
            <AccordionTrigger className='text-lg font-bold'>
              Links de Ayuda
            </AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-2'>
                {costumerServicesPages?.map(({ id, slug: pageSlug, title }) => (
                  <li key={id}>
                    <Link
                      href={`/servicio-al-cliente/${pageSlug}`}
                      className={`hover-200 flex items-center text-base underline ${pageSlug === slug ? 'text-accent hover:text-gray-900' : 'text-gray-900 hover:text-accent'}`}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ul className='space-y-2'>
          {notCostumerServicesPages?.map(({ id, slug: pageSlug, title }) => (
            <li key={id}>
              <Link
                href={`/servicio-al-cliente/${pageSlug}`}
                className={`hover-200 flex items-center underline ${pageSlug === slug ? 'text-accent hover:text-gray-900' : 'text-gray-900 hover:text-accent'}`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default CostumerServiceSidebar
