import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PlaceholderSquare } from '@/assets'
import Link from 'next/link'

interface FeatureSectionProps {
  title: string
  description: string
  bulletPoints: string[]
  imageSrc?: string
  reverse?: boolean
  className?: string
}

export function FeatureSection({
  title,
  description,
  bulletPoints,
  imageSrc,
  reverse = false,
  className
}: FeatureSectionProps) {
  return (
    <section id={title} className={cn('px-4 py-12 md:px-6', className)}>
      <div className='flex flex-col items-center justify-between md:flex-row'>
        <div className='flex h-full flex-1 flex-col items-center justify-between'>
          <div className='w-fit'>
            <h2 className='text-primary text-3xl font-bold tracking-tight text-accent md:text-6xl'>
              {title}
            </h2>
            <p className='text-muted-foreground text-xl'>{description}</p>
            <ul className='space-y-2'>
              {bulletPoints.map((point, index) => (
                <li key={index} className='flex items-start'>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href='#cta'>Call to Action</Link>
        </div>

        <div
          className={cn(
            'bg-muted relative aspect-square h-[400px] w-full flex-1 overflow-hidden',
            reverse ? 'md:order-first' : 'md:order-last'
          )}
        >
          <Image
            src={imageSrc || PlaceholderSquare}
            alt={title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
      </div>
    </section>
  )
}
