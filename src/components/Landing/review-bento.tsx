import { Google } from '@/assets'
import { ArrowDown, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ReviewBento() {
  return (
    <div className='flex aspect-square flex-col items-start justify-between overflow-hidden border p-6 shadow-sm'>
      <div className='flex h-fit items-center justify-center gap-3 text-7xl'>
        4.8
        <div className='flex flex-col items-start gap-1'>
          <Image src={Google} alt='Google' width={100} height={50} />
          <ul className='flex'>
            {Array(5)
              .fill('stars')
              .map((label, index) => (
                <Star
                  key={`${label}-${index}`}
                  size={20}
                  className='fill-yellow-300 text-yellow-300'
                />
              ))}
          </ul>
        </div>
      </div>
      <p className='text-balance text-2xl'>
        Garantía de la mejor calidad y eficiencia
      </p>
      <Link
        href='#testimonials'
        className='text-primary mt-4 inline-flex items-center text-sm font-medium'
      >
        Ver testimonios <ArrowDown className='ml-1 h-4 w-4' />
      </Link>
    </div>
  )
}
