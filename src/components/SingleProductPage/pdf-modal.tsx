import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import PDFThumbnail from './pdf-helpers/thumbnail'
import PDFViewer from './pdf-helpers/viewer'
import Link from 'next/link'
import { Download } from 'lucide-react'

export default function ProductDocumentation({
  pdf
}: {
  pdf: {
    title: string | null
    url: string | null
  }
}) {
  if (!pdf.title || !pdf.url) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className='group h-[280px] w-[200px] cursor-pointer space-y-2 rounded-none p-0'>
          <PDFThumbnail pdfUrl={pdf.url} />
          <h4 className='hover-200 group-hover:text-accent'>{pdf.title}</h4>
        </article>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-[670px] rounded-none border-none bg-white'>
        <DialogHeader className='mt-2 flex flex-row items-center justify-between'>
          <DialogTitle>{pdf.title}</DialogTitle>
          <DialogDescription className='sr-only'>
            Documentación para el Producto de termogar
          </DialogDescription>
          <Link
            href={pdf.url}
            target='_blank'
            className='hover-200 flex items-center justify-center gap-2 text-sm text-gray-900 hover:text-accent'
          >
            <Download className='size-4' /> Descargar
          </Link>
        </DialogHeader>
        <div className='flex-1 overflow-hidden'>
          <PDFViewer pdfUrl={pdf.url} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
