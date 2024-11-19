// * NEXT.JS IMPORTS
import Link from 'next/link'
import Image from 'next/image'

// * ASSETS IMPORTS
import Facebook from '@/components/Helpers/icons/Facebook'
import Instagram from '@/components/Helpers/icons/Instagram'
import Youtube from '@/components/Helpers/icons/Youtube'
import { bigLogo } from '@/assets'
import Gateways from '@/assets/images/payment-getways.png'

// * UTILS IMPORTS
import siteData from '@/data/site-data.json'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_MENU_CATEGORIES } from '@/sanity/lib/queries'

const Footer = async () => {
  const { footerLinks } = siteData

  const searchedCategories = await sanityClientRead.fetch(GET_MENU_CATEGORIES)
  return (
    <footer className='footer-section-wrapper bg-white print:hidden'>
      <div className='container-x mx-auto block pt-[56px]'>
        <div className='mb-[20px] flex w-full flex-col items-center border-b border-gray-200 pb-5'>
          {/* logo area */}
          <Link href='/'>
            <Image
              width={152}
              height={36}
              src={bigLogo}
              alt='Termogar logo'
              className='mb-[40px] h-auto w-auto'
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
            <li className='flex items-center space-x-5 text-gray-600'>
              <a href='#'>
                <Instagram className='fill-current hover:text-gray-900' />
              </a>
              <a href='#'>
                <Facebook className='fill-current hover:text-gray-900' />
              </a>
              <a href='#'>
                <Youtube className='fill-current hover:text-gray-900' />
              </a>
            </li>
          </ul>
          <div className='flex-1 lg:flex'>
            <div className='mb-14 w-full lg:mb-0 lg:w-1/3'>
              <h6 className='font-500 mb-5 text-[18] text-gray-900'>
                Categorias
              </h6>
              <ul className='flex flex-col space-y-1'>
                {searchedCategories.map(({ id, link, name }) => (
                  <li key={id}>
                    <Link href={`/category/${link?.current}`}>
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
                    <Link href={`'/servicio-al-cliente/${slug}`}>
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
                    <Link href={`'/servicio-al-cliente/${slug}`}>
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
      </div>
    </footer>
  )
}

export default Footer
