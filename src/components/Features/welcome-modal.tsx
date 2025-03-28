'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { hasCookie, setCookie } from 'cookies-next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { sanityClientRead } from '@/sanity/lib/client'
import { GET_FEATURE_BY_KEY } from '@/sanity/lib/queries'
import { X } from 'lucide-react'
import { WelcomeModal } from '@/assets'

export default function WebsiteRevampDialog() {
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
        const isFeatureFlagEnabled = await sanityClientRead.fetch(
          GET_FEATURE_BY_KEY,
          { key: 'welcome' },
          {
            cache: 'no-cache',
            next: { revalidate: 60 }
          }
        )

        setShowModal(
          isFeatureFlagEnabled.state === true &&
            !hasCookie('hasSeenRevampDialog')
        )
      } catch (error) {
        console.error('Error fetching feature flag:', error)
      }
    }

    fetchFeatureFlag()
  }, [])

  const handleClick = () => {
    setShowModal(false)
    setCookie('hasSeenRevampDialog', 'true', {})
  }

  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogContent
        className='overflow-hidden bg-white p-0 sm:max-w-[800px]'
        onClick={handleClick}
      >
        <div className='flex flex-col sm:flex-row'>
          <div className='relative h-[300px] w-full bg-accent sm:h-auto sm:w-4/6'>
            <Image
              src={WelcomeModal}
              alt='Visual del rediseño del sitio web'
              fill
              className='object-cover'
            />
          </div>
          <AlertDialogAction
            onClick={handleClick}
            className='ring-offset-background focus:ring-ring absolute right-2 top-2 rounded-sm opacity-70 shadow-none transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2'
          >
            <X className='h-5 w-5 text-accent' />
            <span className='sr-only'>Close</span>
          </AlertDialogAction>

          <div className='p-6 sm:w-3/5'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-xl font-bold md:text-2xl'>
                ¡Nuestro sitio web ha sido renovado!
              </AlertDialogTitle>
              <AlertDialogDescription className='mt-2 text-sm md:text-base'>
                Estamos emocionados de presentar nuestro sitio web rediseñado
                con funciones y experiencia de usuario mejorada.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className='mt-6 space-y-3'>
              <h3 className='text-base font-semibold md:text-lg'>
                Nuevas Características:
              </h3>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <div className='mt-1 h-3 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3 text-xs md:text-base'>
                    Interfaz de usuario completamente rediseñada para una mejor
                    navegación
                  </span>
                </li>
                <li className='flex items-start'>
                  <div className='mt-1 h-3 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3 text-xs md:text-base'>
                    Función e interfaz de comparación para que puedas decidir
                    con más información
                  </span>
                </li>
                <li className='flex items-start'>
                  <div className='mt-1 h-3 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3 text-xs md:text-base'>
                    Funcionalidad de búsqueda mejorada y Filtros para encontrar
                    lo que necesitas más rápido
                  </span>
                </li>
                <li className='flex items-start'>
                  <div className='mt-1 h-3 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3 text-sm md:text-lg'>¡Y mucho más!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
