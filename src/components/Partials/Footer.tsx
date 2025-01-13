// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import { bigLogo } from '@/assets'
import Gateways from '@/assets/images/payment-getways.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

// * UTILS IMPORTS
import siteData from '@/data/site-data.json'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'
import Instagram from '@/components/Helpers/icons/Instagram'
import Facebook from '@/components/Helpers/icons/Facebook'
import Youtube from '@/components/Helpers/icons/Youtube'
import { Logger } from 'next-axiom'

const log = new Logger()
const Footer = async () => {
  const { footerLinks } = siteData

  const searchedCategories = await sanityClientRead.fetch(
    GET_MENU_CATEGORIES,
    {},
    { cache: 'force-cache', next: { revalidate: 43200 } }
  )

  if (!searchedCategories) {
    log.error('No categories found')
  }

  return (
    <footer className='footer-section-wrapper bg-white print:hidden'>
      <div className='container-x mx-auto block pt-5'>
        <div className='mb-[20px] flex w-full flex-col items-center border-b border-gray-200 pb-5'>
          {/* logo area */}
          <Link href='/'>
            <Image
              width={152}
              height={36}
              src={bigLogo}
              alt='Termogar logo'
              className='mb-5 h-auto w-auto'
            />
          </Link>
        </div>
        <div className='mb-5 justify-between md:mb-11 lg:flex'>
          <ul className='mb-4 ml-0 flex w-full flex-col space-y-2 md:mb-8 lg:mb-0 lg:w-[424px]'>
            {footerLinks.info.map((item) => (
              <li key={item}>
                <span className='text-[15px] text-gray-500'>{item}</span>
              </li>
            ))}
            <li className='flex items-center space-x-2 text-gray-600'>
              <Link
                href='https://www.instagram.com/termogar.es/'
                target='_blank'
                className='flex aspect-square size-7 items-center justify-center rounded-full bg-accent'
              >
                <Instagram className='hover-200 fill-gray-100 hover:fill-gray-900' />
              </Link>
              <Link
                href='https://es-es.facebook.com/termogar'
                target='_blank'
                className='flex aspect-square size-7 items-center justify-center rounded-full bg-accent'
              >
                <Facebook className='hover-200 fill-gray-100 hover:fill-gray-900' />
              </Link>
              <Link
                href='https://www.youtube.com/channel/UC2bX_gn3IX27PP2fyDpbhbg'
                target='_blank'
                className='flex aspect-square size-7 items-center justify-center rounded-full bg-accent'
              >
                <Youtube className='hover-200 fill-gray-100 hover:fill-gray-900' />
              </Link>
            </li>
          </ul>

          {/* FOOTER LINKS DESKTOP */}
          <div className='hidden flex-1 md:block xl:flex'>
            <div className='mb-14 w-full lg:mb-0 lg:w-1/3'>
              <h6 className='font-500 mb-5 text-[18] text-gray-900'>
                Categorias
              </h6>
              <ul className='flex flex-col space-y-1'>
                {searchedCategories.map(({ id, slug, name }) => (
                  <li key={`desktop-category-${id}`}>
                    <Link href={`/categorias/${slug}`}>
                      <span className='cursor-pointer border-b border-transparent text-[15px] text-gray-600 hover:border-gray-900 hover:text-gray-900'>
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='mb-14 w-full lg:mb-0 lg:flex lg:w-1/3 lg:flex-col'>
              <h6 className='font-500 mb-5 text-[18] text-gray-900'>
                Atencion al Cliente
              </h6>
              <ul className='flex flex-col space-y-1'>
                {footerLinks['Atención al Cliente'].map(
                  ({ id, name, slug }) => (
                    <li key={id}>
                      <Link href={`/${slug}`}>
                        <span className='cursor-pointer border-b border-transparent text-[15px] text-gray-600 hover:border-gray-900 hover:text-gray-900'>
                          {name}
                        </span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className='mb-14 w-full lg:mb-0 lg:flex lg:w-1/3 lg:flex-col'>
              <h6 className='font-500 mb-5 text-[18] text-gray-900'>
                Paginas Legales
              </h6>
              <ul className='flex flex-col space-y-1'>
                {footerLinks['Paginas Legales'].map(({ id, name, slug }) => (
                  <li key={id}>
                    <Link href={`/paginas-legales/${slug}`}>
                      <span className='cursor-pointer border-b border-transparent text-[15px] text-gray-600 hover:border-gray-900 hover:text-gray-900'>
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FOOTER LINKS MOBILE */}
          <Accordion type='single' collapsible className='md:hidden'>
            <AccordionItem value='categories'>
              <AccordionTrigger className='text-lg'>
                Categorias
              </AccordionTrigger>
              <AccordionContent>
                <ul className='flex flex-col space-y-1' role='categories'>
                  {searchedCategories.map(({ id, slug, name }) => (
                    <li key={`mobile-category-${id}`}>
                      <Link
                        href={`/categorias/${slug}`}
                        className='cursor-pointer border-b border-transparent text-[15px] text-gray-600 hover:border-gray-900 hover:text-gray-900'
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='client'>
              <AccordionTrigger className='text-lg'>
                Atencion al Cliente
              </AccordionTrigger>
              <AccordionContent>
                <ul className='flex flex-col space-y-1' role='categories'>
                  {footerLinks['Atención al Cliente'].map(
                    ({ id, slug, name }) => (
                      <li key={id}>
                        <Link
                          href={`/${slug}`}
                          className='cursor-pointer border-b border-transparent text-[15px] text-gray-600 hover:border-gray-900 hover:text-gray-900'
                        >
                          {name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='legal'>
              <AccordionTrigger className='text-lg'>
                Paginas Legales
              </AccordionTrigger>
              <AccordionContent>
                <ul className='flex flex-col space-y-1' role='categories'>
                  {footerLinks['Paginas Legales'].map(({ id, slug, name }) => (
                    <li key={id}>
                      <Link
                        href={`/paginas-legales/${slug}`}
                        className='cursor-pointer border-b border-transparent text-[15px] text-gray-600 hover:border-gray-900 hover:text-gray-900'
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className='items-center justify-between border-gray-200 py-3 text-gray-500 md:border-t lg:flex lg:h-[82px]'>
          <div className='mb-3 flex items-center justify-between lg:space-x-5'>
            <small>termogar.es - PEREZEMMALVA SLU - CIF: B-72301666.</small>
            <small>
              Inscrita en Registro Mercantil Tomo 2180, Folio 184, Sección 8,
              Hoja 49059, Inscripción 1.
            </small>
          </div>
          <Image width='318' height='28' src={Gateways} alt='payment-getways' />
        </div>

        {/* Designer and developer */}
        <div className='border-t border-gray-200 py-2 text-center text-gray-500'>
          <small>Copyright ©️2025 | TERMOGAR | PEREZEMMALVA SLU</small>
          <small className='sr-only'>
            Created with <span className='text-red-500'>❤️</span>, powered by{' '}
            <Link
              href='https://nextjs.org/'
              className='underline'
              target='_blank'
            >
              Next.js
            </Link>{' '}
            and made by{' '}
            <Link
              href='https://www.adrian-alvarez.dev/es/'
              className='underline'
              target='_blank'
            >
              Adrian
            </Link>
          </small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
