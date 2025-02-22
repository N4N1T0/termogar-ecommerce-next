// * NEXT.JS IMPORTS
import Link from 'next/link'

// * ASSETS IMPORTS
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'

// * UTILS IMPORTS
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_COSTUMER_SERVICES_SIDEBAR_MENU } from '@/sanity/lib/queries'
import { Logger } from 'next-axiom'

const log = new Logger()

const MATCH_URL_SERVICE = 'gestion-de-pedidos'
const MATCH_URL_PROFILE = 'nosotros'
const MATCH_URL_TERMS = 'terminos-legales'

const CostumerServiceSidebar = async () => {
  const searchedPages = await sanityClientRead.fetch(
    GET_COSTUMER_SERVICES_SIDEBAR_MENU
  )

  if (!searchedPages) {
    log.error('The sidebar menu was not found')
  }

  // Group pages by category
  const gestionDePedidosPages = searchedPages?.filter((page) =>
    page.category?.split('/').includes(MATCH_URL_SERVICE)
  )

  const nosotrosPages = searchedPages?.filter((page) =>
    page.category?.split('/').includes(MATCH_URL_PROFILE)
  )

  const terminosLegalesPages = searchedPages?.filter((page) =>
    page.category?.split('/').includes(MATCH_URL_TERMS)
  )

  return (
    <>
      <aside className='sticky top-0 m-4 hidden h-screen w-72 divide-y-[1px] overflow-y-auto text-balance bg-white px-4 pt-10 md:block'>
        <nav aria-label='Customer Service Navigation'>
          <h2 className='mb-4 text-xl font-semibold uppercase text-accent'>
            Servicio de Atención al Cliente
          </h2>

          <Accordion
            type='single'
            collapsible
            className='mb-4'
            defaultValue='gestion-de-pedidos'
          >
            <AccordionItem value='gestion-de-pedidos'>
              <AccordionTrigger className='text-lg font-bold'>
                Gestión de Pedidos
              </AccordionTrigger>
              <AccordionContent>
                <ul className='space-y-2'>
                  {gestionDePedidosPages?.map(
                    ({ id, slug: pageSlug, title }) => (
                      <li key={id}>
                        <Link
                          href={`/servicio-al-cliente/${pageSlug}`}
                          className='hover-200 flex items-center text-base text-gray-900 hover:text-gray-900'
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='nosotros'>
              <AccordionTrigger className='text-lg font-bold'>
                Nosotros
              </AccordionTrigger>
              <AccordionContent>
                <ul className='space-y-2'>
                  {nosotrosPages?.map(({ id, slug: pageSlug, title }) => (
                    <li key={id}>
                      <Link
                        href={`/servicio-al-cliente/${pageSlug}`}
                        className='hover-200 flex items-center text-base text-gray-900 hover:text-gray-900'
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='terminos-legales'>
              <AccordionTrigger className='text-lg font-bold'>
                Términos Legales
              </AccordionTrigger>
              <AccordionContent>
                <ul className='space-y-2'>
                  {terminosLegalesPages?.map(
                    ({ id, slug: pageSlug, title }) => (
                      <li key={id}>
                        <Link
                          href={`/servicio-al-cliente/${pageSlug}`}
                          className='hover-200 flex items-center text-base text-gray-900 hover:text-gray-900'
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </aside>

      {/* MOBILE */}
      <Sheet>
        <SheetTrigger asChild>
          <div className='mt-3 flex w-full justify-end px-3 md:hidden'>
            <button className='border border-accent px-4 py-2 text-accent'>
              Filtrar por...
            </button>
          </div>
        </SheetTrigger>
        <SheetContent className='overflow-y-auto bg-white' side='right'>
          <SheetHeader>
            <SheetTitle className='sr-only'>Atencion al Cliente</SheetTitle>
            <SheetDescription className='sr-only'>
              Links de Atencion al Cliente de Termogar.es
            </SheetDescription>
          </SheetHeader>
          <nav aria-label='Customer Service Navigation'>
            <h2 className='mb-4 text-xl font-semibold uppercase text-accent'>
              Servicio de Atención al Cliente
            </h2>

            <Accordion
              type='single'
              collapsible
              className='mb-4'
              defaultValue='gestion-de-pedidos'
            >
              <AccordionItem value='gestion-de-pedidos'>
                <AccordionTrigger className='text-lg font-bold'>
                  Gestión de Pedidos
                </AccordionTrigger>
                <AccordionContent>
                  <ul className='space-y-2'>
                    {gestionDePedidosPages?.map(
                      ({ id, slug: pageSlug, title }) => (
                        <li key={id}>
                          <SheetClose asChild>
                            <Link
                              href={`/servicio-al-cliente/${pageSlug}`}
                              className='hover-200 flex items-center text-base text-gray-900 hover:text-gray-900'
                            >
                              {title}
                            </Link>
                          </SheetClose>
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='nosotros'>
                <AccordionTrigger className='text-lg font-bold'>
                  Nosotros
                </AccordionTrigger>
                <AccordionContent>
                  <ul className='space-y-2'>
                    {nosotrosPages?.map(({ id, slug: pageSlug, title }) => (
                      <li key={id}>
                        <SheetClose asChild>
                          <Link
                            href={`/servicio-al-cliente/${pageSlug}`}
                            className='hover-200 flex items-center text-base text-gray-900 hover:text-gray-900'
                          >
                            {title}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='terminos-legales'>
                <AccordionTrigger className='text-lg font-bold'>
                  Términos Legales
                </AccordionTrigger>
                <AccordionContent>
                  <ul className='space-y-2'>
                    {terminosLegalesPages?.map(
                      ({ id, slug: pageSlug, title }) => (
                        <li key={id}>
                          <SheetClose asChild>
                            <Link
                              href={`/servicio-al-cliente/${pageSlug}`}
                              className='hover-200 flex items-center text-base text-gray-900 hover:text-gray-900'
                            >
                              {title}
                            </Link>
                          </SheetClose>
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CostumerServiceSidebar
