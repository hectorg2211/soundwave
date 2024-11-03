'use client'
import React, { useEffect } from 'react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'

import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'
import toast from 'react-hot-toast'

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()

  useEffect(() => {
    if (session?.access_token) {
      toast.success('Logged in')
      router.refresh()
      onClose()
    }
  }, [session?.access_token, router, onClose])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  return (
    <Modal title='Welcome back' description='Log in to your account' isOpen={isOpen} onChange={onChange}>
      <Auth
        theme='dark'
        magicLink
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: '#404040', brandAccent: '#f97316' } },
          },
        }}
      />
    </Modal>
  )
}

export default AuthModal
