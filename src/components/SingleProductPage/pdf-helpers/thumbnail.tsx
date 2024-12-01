'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function PDFThumbnail({ pdfUrl }: { pdfUrl: string }) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  useEffect(() => {
    const generateThumbnail = async () => {
      const canvas = document.createElement('canvas')
      const page = await pdfjs
        .getDocument(pdfUrl)
        .promise.then((pdf) => pdf.getPage(1))
      const viewport = page.getViewport({ scale: 0.5 })
      canvas.height = viewport.height
      canvas.width = viewport.width
      await page.render({ canvasContext: canvas.getContext('2d')!, viewport })
        .promise
      setThumbnailUrl(canvas.toDataURL())
    }

    generateThumbnail()
  }, [pdfUrl])

  if (!thumbnailUrl) {
    return <div className='h-full w-full animate-pulse bg-gray-200' />
  }

  return (
    <Image
      src={thumbnailUrl}
      alt='PDF Thumbnail'
      width={200}
      height={300}
      className='h-full w-full object-cover'
    />
  )
}
