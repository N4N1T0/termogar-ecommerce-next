'use client'

// * NEXT.jS IMPORTS
import { useState } from 'react'
import Image from 'next/image'

// * ASSETS IMPORTS
import { PlayCircle } from 'lucide-react'
const tempVideos = [
  {
    id: '1',
    title: 'Product Showcase: Latest Collection',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: "How It's Made: Behind the Scenes",
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'Customer Reviews: Real Experiences',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'Styling Tips: Get the Look',
    videoId: 'dQw4w9WgXcQ'
  }
]

const YouTubeEmbed = ({
  videoId,
  title
}: {
  videoId: string
  title: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

  return (
    <div className='relative aspect-video bg-gray-200'>
      {!isLoaded && (
        <>
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            fill
            className='object-cover'
          />
          <div
            className='group absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-20'
            onClick={() => setIsLoaded(true)}
          >
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-white/80 transition-colors group-hover:bg-white'>
              <PlayCircle className='h-6 w-6 text-accent' />
              <span className='sr-only'>Play video</span>
            </div>
          </div>
        </>
      )}
      {isLoaded && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='absolute left-0 top-0 h-full w-full rounded-t-lg'
        />
      )}
    </div>
  )
}

const YouTubeVideoSection = ({
  videos = tempVideos
}: {
  videos?:
    | { videoId: string | null; id: string; title: string | null }[]
    | null
    | undefined
}) => {
  return (
    <section id='youtube' className='container-x mx-auto bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='font-600 mb-5 text-xl leading-none text-gray-900 sm:text-3xl'>
          Nuestros Videos
        </h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {videos?.map((video) => (
            <div key={video.id} className='overflow-hidden bg-white shadow-lg'>
              <YouTubeEmbed
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
