'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'

import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import usePlayer from '@/hooks/usePlayer'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer()
  const authModal = useAuthModal()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    player.reset()
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out')
    }
  }

  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-orange-800 p-6', className)}>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => router.back()}
            className='rounded-full bg-black flex items-center justify-center hover:opacity-75'
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className='rounded-full bg-black flex items-center justify-center hover:opacity-75'
          >
            <RxCaretRight className='text-white' size={35} />
          </button>
        </div>

        <div className='flex md:hidden gap-x-2 items-center'>
          <a
            href='/'
            className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
          >
            <HiHome className='text-black' size={20} />
          </a>

          <a
            href='/search'
            className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
          >
            <BiSearch className='text-black' size={20} />
          </a>
        </div>

        <div className='flex justify-between items-center gap-x-4'>
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button className='bg-white px-6 py-2' onClick={handleLogout}>
                Log out
              </Button>
              <Button className='bg-white' onClick={() => router.push('/account')}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button onClick={authModal.onOpen} className='bg-transparent text-neutral-300 font-medium'>
                  Sign up
                </Button>
              </div>

              <div>
                <Button onClick={authModal.onOpen} className='bg-white px-6 py-2'>
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
