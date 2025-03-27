'use client'

// * NEXT.jS IMPORTS
import React from 'react'
import Link from 'next/link'
import { YouTubeEmbed } from '@next/third-parties/google'

// * ASSETS IMPORTS
import { ArrowRight } from 'lucide-react'

const YouTubeEmbedCard = React.memo(
  ({ videoId, title }: { videoId: string; title: string }) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

    return (
      <div className='relative aspect-video bg-gray-200' title={title}>
        <YouTubeEmbed
          videoid={videoId}
          params='accelerometer=1&autoplay&clipboard-write=1&encrypted-media=1&gyroscope=1&picture-in-picture=1'
          style={`background-image: url(${thumbnailUrl});`}
        />
      </div>
    )
  }
)

const YouTubeVideoSection = ({
  videos
}: {
  videos?:
    | { videoId: string | null; id: string; title: string | null }[]
    | null
    | undefined
}) => {
  return (
    <section id='youtube' className='container-x mx-auto bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='section-title mb-5 flex items-center justify-between'>
          <div>
            <h1 className='font-600 text-xl leading-none text-gray-900 sm:text-3xl'>
              Nuestros Videos
            </h1>
          </div>
          <div>
            <Link
              href='https://www.youtube.com/@termogar.es-expertosenclim7158'
              target='_blank'
            >
              <div className='flex items-center space-x-2'>
                <p className='font-600 text-qblack text-base'>Ver Mas</p>
                <span className='animate-right-dir'>
                  <ArrowRight className='text-qblack h-4 w-4' />
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {videos?.map((video) => (
            <div key={video.id} className='overflow-hidden bg-white shadow-lg'>
              <YouTubeEmbedCard
                videoId={video.videoId || 'dQw4w9WgXcQ'}
                title={video.title || 'Sin Nombre'}
              />
              <div className='p-4'>
                <h3 className='title font-600 mb-1 line-clamp-2 text-[15px] leading-[24px] text-gray-900 transition-colors duration-150 ease-in-out'>
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouTubeVideoSection
