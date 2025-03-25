'use client'

import React, { useEffect, useState } from 'react'
import { hasCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_FEATURE_BY_KEY } from '@/sanity/lib/queries'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState<boolean>(false)

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
        const isFeatureFlagEnabled = await sanityClientRead.fetch(
          GET_FEATURE_BY_KEY,
          { key: 'cookie' },
          {
            cache: 'no-cache',
            next: { revalidate: 60 }
          }
        )
        setShowConsent(
          isFeatureFlagEnabled?.state === true && !hasCookie('localConsent')
        )
      } catch (error) {
        console.error('Error fetching feature flag:', error)
      }
    }

    fetchFeatureFlag()
  }, [])

  const acceptCookie = () => {
    setShowConsent(true)
    setCookie('localConsent', 'true', {})
  }

  const rejectCookie = () => {
    setShowConsent(true)
    setCookie('localConsent', 'false', {})
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 bg-accent/30 bg-opacity-70'>
      <div className='fixed bottom-0 left-0 right-0 bg-gray-100 px-4 py-6 shadow-lg sm:px-6 sm:py-8'>
        <div className='flex flex-col gap-5 space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <span className='text-dark text-center text-sm sm:text-left sm:text-base'>
            Este sitio web utiliza cookies para mejorar la experiencia del
            usuario. Al utilizar nuestro sitio web, consientes el uso de todas
            las cookies de acuerdo con nuestra{' '}
            <Link
              href='/paginas-legales/politica-de-cookies'
              target='_blank'
              className='text-accent/90 hover:underline'
            >
              Política de Cookies
            </Link>{' '}
            o nuestra{' '}
            <Link
              href='/paginas-legales/politica-de-privacidad'
              target='_blank'
              className='text-accent/90 hover:underline'
            >
              Política de Privacidad
            </Link>
          </span>
          <div className='flex justify-center space-x-4'>
            <button
              type='button'
              onClick={acceptCookie}
              className='hover-200 bg-accent px-3 py-1 text-gray-100 hover:text-gray-900'
            >
              Aceptar
            </button>
            <button
              type='button'
              className='hover-200 bg-tertiary px-3 py-1 text-gray-100 hover:text-gray-900'
              onClick={rejectCookie}
            >
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
