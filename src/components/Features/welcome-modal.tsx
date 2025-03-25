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
          isFeatureFlagEnabled.state && !hasCookie('hasSeenRevampDialog')
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
        className='overflow-hidden bg-white p-0 sm:max-w-[600px]'
        onClick={handleClick}
      >
        <div className='flex flex-col sm:flex-row'>
          <div className='relative h-[200px] w-full bg-accent sm:h-auto sm:w-2/5'>
            <Image
              src='/placeholder.svg?height=400&width=300'
              alt='Visual del rediseño del sitio web'
              fill
              className='object-cover'
            />
          </div>
          <button
            onClick={handleClick}
            className='ring-offset-background focus:ring-ring absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2'
          >
            <X className='h-5 w-5 text-accent' />
            <span className='sr-only'>Close</span>
          </button>

          <div className='p-6 sm:w-3/5'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-2xl font-bold'>
                ¡Nuestro sitio web ha sido renovado!
              </AlertDialogTitle>
              <AlertDialogDescription className='mt-2 text-base'>
                Estamos emocionados de presentar nuestro sitio web rediseñado
                con funciones y experiencia de usuario mejorada.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className='mt-6 space-y-4'>
              <h3 className='text-lg font-semibold'>Nuevas Características:</h3>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <div className='mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3'>
                    Interfaz de usuario completamente rediseñada para una mejor
                    navegación
                  </span>
                </li>
                <li className='flex items-start'>
                  <div className='mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3'>
                    Función e interfaz de comparación para que puedas decidir
                    con más información
                  </span>
                </li>
                <li className='flex items-start'>
                  <div className='mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3'>
                    Funcionalidad de búsqueda mejorada y Filtros para encontrar
                    lo que necesitas más rápido
                  </span>
                </li>
                <li className='flex items-start text-xl'>
                  <div className='mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-accent'></div>
                  <span className='ml-3'>¡Y mucho más!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
