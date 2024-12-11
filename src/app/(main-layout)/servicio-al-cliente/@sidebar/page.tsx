// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_SIDEBAR_MENU } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'

const log = new Logger()
const MATCH_URL_SERVICE = 'servicio-de-atencion-al-cliente'
const MATCH_URL_PROFILE = 'mi-cuenta'

const CostumerServiceSidebar = async ({
  params
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { slug } = await params

  const searchedPages = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_SIDEBAR_MENU
  )

  if (!searchedPages) {
    log.error('The sidebar menu was not found')
  }

  const costumerServicesPages = searchedPages?.filter((page) => {
    return page.link?.split('/').includes(MATCH_URL_SERVICE)
  })

  const profileServicesPages = searchedPages?.filter((page) => {
    return page.link?.split('/').includes(MATCH_URL_PROFILE)
  })

  const otherPages = searchedPages?.filter((page) => {
    return (
      !page.link?.split('/').includes(MATCH_URL_SERVICE) &&
      !page.link?.split('/').includes(MATCH_URL_PROFILE)
    )
  })

  return (
    <aside className='sticky top-0 m-4 h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10'>
      <nav aria-label='Customer Service Navigation'>
        <h2 className='mb-4 text-xl font-semibold uppercase text-accent'>
          Servicio de Atencion al cliente
        </h2>

        <Accordion
          type='single'
          collapsible
          className='mb-4'
          defaultValue='links-de-ayuda'
        >
          <AccordionItem value='cliente'>
            <AccordionTrigger className='text-lg font-bold'>
              Cliente
            </AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-2'>
                {costumerServicesPages?.map(({ id, slug: pageSlug, title }) => (
                  <li key={id} className='cursor-pointer'>
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
          <AccordionItem value='mi-cuenta'>
            <AccordionTrigger className='text-lg font-bold'>
              Mi Cuenta
            </AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-2'>
                {profileServicesPages?.map(({ id, slug: pageSlug, title }) => (
                  <li key={id} className='cursor-pointer'>
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
          <AccordionItem value='links-de-ayuda'>
            <AccordionTrigger className='text-lg font-bold'>
              Links de Ayuda
            </AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-2'>
                {otherPages?.map(({ id, slug: pageSlug, title }) => (
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </aside>
  )
}

export default CostumerServiceSidebar
