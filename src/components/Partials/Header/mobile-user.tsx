'use client'

// * NEXT.JS IMPORTS
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// * ASSETS IMPORTS
import { PlaceholderSquare } from '@/assets'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { Session } from 'next-auth'

const MobileUser = ({ session }: { session: Session | null }) => {
  const path = usePathname()

  if (session === null) {
    return (
      <Link
        href={`/login?redirectTo=${path}`}
        className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
      >
        <User className='text-gray-900' />
      </Link>
    )
  }

  const { user } = session

  return (
    <Link
      href={`/perfil/${user?.id}?tab=profile`}
      className='font-400 border-b border-transparent text-sm text-gray-500 hover:border-accent hover:text-accent'
    >
      <Avatar>
        <AvatarImage src={user?.image || PlaceholderSquare.src} />
        <AvatarFallback>
          {user?.name?.split('').slice(0, 2).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Link>
  )
}

export default MobileUser
