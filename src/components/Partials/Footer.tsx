// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import { bigLogo } from '@/assets'
import Gateways from '@/assets/images/payment-getways.png'

// * UTILS IMPORTS
import siteData from '@/data/site-data.json'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'
import Instagram from '@/components/Helpers/icons/Instagram'
import Facebook from '@/components/Helpers/icons/Facebook'
import Youtube from '@/components/Helpers/icons/Youtube'

const Footer = async () => {
  const { footerLinks } = siteData

  const searchedCategories = await sanityClientRead.fetch(
    GET_MENU_CATEGORIES,
    {},
    { cache: 'force-cache', next: { revalidate: 43200 } }
  )
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
        <div className='mb-11 justify-between lg:flex'>
          <ul className='mb-8 ml-0 flex w-full flex-col space-y-2 lg:mb-0 lg:w-[424px]'>
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
          <div className='flex-1 lg:flex'>
            <div className='mb-14 w-full lg:mb-0 lg:w-1/3'>
              <h6 className='font-500 mb-5 text-[18] text-gray-900'>
                Categorias
              </h6>
              <ul className='flex flex-col space-y-1'>
                {searchedCategories.map(({ id, slug, name }) => (
                  <li key={id}>
                    <Link href={`/categoria/${slug}`}>
                      <span className='cursor-pointer border-b border-transparent text-[15px] capitalize text-gray-600 hover:border-gray-900 hover:text-gray-900'>
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
                {footerLinks['Atención al Cliente'].map(({ name, slug }) => (
                  <li key={name}>
                    <Link href={`/${slug}`}>
                      <span className='cursor-pointer border-b border-transparent text-[15px] capitalize text-gray-600 hover:border-gray-900 hover:text-gray-900'>
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='mb-14 w-full lg:mb-0 lg:flex lg:w-1/3 lg:flex-col'>
              <h6 className='font-500 mb-5 text-[18] text-gray-900'>
                Paginas Legales
              </h6>
              <ul className='flex flex-col space-y-1'>
                {footerLinks['Paginas Legales'].map(({ name, slug }) => (
                  <li key={name}>
                    <Link href={`/paginas-legales/${slug}`}>
                      <span className='cursor-pointer border-b border-transparent text-[15px] capitalize text-gray-600 hover:border-gray-900 hover:text-gray-900'>
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='bottom-bar border-gray-500-border items-center justify-between border-t text-gray-500 lg:flex lg:h-[82px]'>
          <div className='mb-3 flex items-center justify-between lg:space-x-5'>
            <small>termogar.es - PEREZEMMALVA SLU - CIF: B-72301666.</small>
            <small>
              Inscrita en Registro Mercantil Tomo 2180, Folio 184, Sección 8,
              Hoja 49059, Inscripción 1.
            </small>
          </div>
          <Image width='318' height='28' src={Gateways} alt='payment-getways' />
        </div>
        {/* // TODO: Make my statement */}
      </div>
    </footer>
  )
}

export default Footer
