import ContactCTA from '@/components/Landing/cta'
import InstallationHeroBento from '@/components/Landing/installation-hero'
import Testimonials from '@/components/Landing/testimonials'
import { FeatureSection } from '@/components/Landing/two-columns'
import React from 'react'

export default function InstallationLandingPage() {
  return (
    <main className='container-x mx-auto my-3 w-full'>
      <InstallationHeroBento />
      <FeatureSection
        title='Instalación de equipos'
        description='Instalación de equipos'
        bulletPoints={[
          'Instalación de equipos',
          'Instalación de equipos',
          'Instalación de equipos'
        ]}
      />
      <FeatureSection
        title='Instalación de equipos'
        description='Instalación de equipos'
        bulletPoints={[
          'Instalación de equipos',
          'Instalación de equipos',
          'Instalación de equipos'
        ]}
        reverse={true}
      />
      <Testimonials />
      <ContactCTA />
    </main>
  )
}
