'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'px-4 py-2 border border-gray-200 bg-white shadow-lg rounded-sm flex gap-4 items-center text-gray-800 text-sm',
          actionButton:
            'bg-accent hover:text-gray-100 hover-200 rounded-sm px-3 py-2 text-balance w-1/4',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:bg-accent'
        },
        duration: 3000
      }}
      {...props}
    />
  )
}

export { Toaster }
