import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface TestimonialProps {
  quote: string
  name: string
  company: string
  rating: number
}

const testimonials: TestimonialProps[] = [
  {
    quote:
      'Excelente servicio y atención personalizada. Siempre atentos a los detalles y muy profesionales.',
    name: 'Carlos Méndez',
    company: 'Empresa Innovadora',
    rating: 5
  },
  {
    quote:
      'Los productos son de alta calidad y llegaron a tiempo. Muy recomendable.',
    name: 'Laura Sánchez',
    company: 'Compañía Progreso S.A.',
    rating: 5
  },
  {
    quote:
      'Increíble experiencia de compra. El soporte técnico es excepcional y resolvieron todas mis dudas.',
    name: 'Roberto Jiménez',
    company: 'Grupo Tecnológico',
    rating: 5
  },
  {
    quote:
      'Profesionalismo, rapidez y productos de calidad. Definitivamente volveré a comprar.',
    name: 'María López',
    company: 'Diseños Creativos',
    rating: 5
  },
  {
    quote: 'Servicio al cliente excepcional. Muy satisfecho con mi compra.',
    name: 'José Ramírez',
    company: 'Soluciones Web',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section
      className='mx-auto max-w-7xl px-4 py-12 md:py-20'
      id='testimonials'
    >
      <div className='mb-12 text-center'>
        <h2 className='mb-3 inline-block text-4xl font-bold text-accent md:text-6xl'>
          Testimonios de Clientes
        </h2>
        <p className='text-muted-foreground'>
          Descubre lo que nuestros clientes dicen sobre nuestros servicios
        </p>
        <Link
          href='https://g.co/kgs/89o8iBR'
          target='_blank'
          className='text-secondary underline'
        >
          Ver Mas
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
        {/* First row */}
        <div className='border p-6 shadow-md'>
          <TestimonialCard
            quote={testimonials[0].quote}
            name={testimonials[0].name}
            company={testimonials[0].company}
            rating={testimonials[0].rating}
          />
        </div>

        <div className='border p-6 shadow-md md:translate-y-8'>
          <TestimonialCard
            quote={testimonials[1].quote}
            name={testimonials[1].name}
            company={testimonials[1].company}
            rating={testimonials[1].rating}
          />
        </div>

        <div className='border p-6 shadow-md'>
          <TestimonialCard
            quote={testimonials[2].quote}
            name={testimonials[2].name}
            company={testimonials[2].company}
            rating={testimonials[2].rating}
          />
        </div>

        {/* Second row */}
        <div className='border p-6 shadow-md md:col-start-1 md:col-end-2 md:translate-y-4'>
          <TestimonialCard
            quote={testimonials[3].quote}
            name={testimonials[3].name}
            company={testimonials[3].company}
            rating={testimonials[3].rating}
          />
        </div>

        <div className='border p-6 shadow-md md:col-start-3 md:col-end-4 md:translate-y-4'>
          <TestimonialCard
            quote={testimonials[4].quote}
            name={testimonials[4].name}
            company={testimonials[4].company}
            rating={testimonials[4].rating}
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, name, company, rating }: TestimonialProps) {
  return (
    <div className='flex h-full flex-col'>
      <div className='mb-3 flex'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'fill-yellow-300 text-yellow-300' : 'text-gray-300'}`}
          />
        ))}
      </div>

      <p className='mb-4 flex-grow text-sm md:text-base'>&quot;{quote}&quot;</p>

      <div className='mt-auto flex items-center'>
        <div className='mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200'>
          <Image
            src='/placeholder.svg?height=40&width=40'
            alt={name}
            width={40}
            height={40}
            className='object-cover'
          />
        </div>
        <div>
          <p className='text-sm font-semibold'>{name}</p>
          <p className='text-muted-foreground text-xs'>{company}</p>
        </div>
      </div>
    </div>
  )
}
