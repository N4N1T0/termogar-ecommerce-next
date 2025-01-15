'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { getVideoIdFromUrl } from '@/lib/utils'
import { PlayCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const YoutubeDialog = ({
  children,
  url
}: {
  children: React.ReactNode
  url: string
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const youtubeThumbnail = getVideoIdFromUrl(url || '')

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-4xl rounded-none border-gray-200 bg-white'>
        <DialogHeader>
          <DialogTitle className='sr-only'>Youtube Dialog</DialogTitle>
          <DialogDescription className='sr-only'>
            esto es una modal para el video de youtube correspondiente con la
            url
            {url}
          </DialogDescription>
        </DialogHeader>
        <div className='relative aspect-video bg-gray-200'>
          {!isLoaded && (
            <>
              <Image
                src={youtubeThumbnail[0] as string}
                alt={url}
                width={800}
                height={800}
                className='h-full w-full object-cover'
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
              src={`https://www.youtube-nocookie.com/embed/${youtubeThumbnail[1]}?autoplay=1`}
              title={url}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='absolute left-0 top-0 h-full w-full'
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default YoutubeDialog
