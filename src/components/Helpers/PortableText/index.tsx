import Link from 'next/link'

export const portableTextComponents = {
  types: {
    link: ({ value }: { value: { link: string; text?: string } }) => {
      const { link: url, text } = value

      return (
        <Link
          href={`/servicio-al-cliente/${url}`}
          rel='noopener noreferrer'
          className='hover-200 block w-fit underline hover:text-accent'
        >
          {text || url}
        </Link>
      )
    }
  }
}
