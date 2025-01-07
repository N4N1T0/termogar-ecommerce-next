/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useCallback, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Script from 'next/script'

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: unknown) => void
          prompt: (callback: (notification: unknown) => void) => void
          cancel: () => void
          revoke: (hint: string, callback: () => void) => void
        }
      }
    }
  }
}

export default function GoogleOneTap() {
  const { data: session } = useSession()
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false)
  const [isOneTapInitialized, setIsOneTapInitialized] = useState(false)

  const handleCredentialResponse = useCallback((response: any) => {
    signIn('google', {
      credential: response.credential,
      redirect: false
    }).catch((error) => {
      console.error('Error signing in:', error)
    })
  }, [])

  const initializeGoogleOneTap = useCallback(() => {
    if (window.google && !session && !isOneTapInitialized) {
      try {
        // Cancel any active prompts before initializing
        window.google.accounts.id.cancel()

        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
          context: 'signin', // or 'signup' based on your use case
          ux_mode: 'popup',
          auto_select: false,
          use_fedcm_for_prompt: true,
          enable_debug_logs: true
        })

        window.google.accounts.id.prompt((notification: any) => {
          if (
            notification.isNotDisplayed() &&
            notification.getNotDisplayedReason() === 'fedcm_disabled'
          ) {
            console.warn(
              'FedCM is disabled in the browser settings. Please enable third-party cookies or allow FedCM in your browser.'
            )
          } else if (notification.isNotDisplayed()) {
            console.warn(
              'One Tap was not displayed:',
              notification.getNotDisplayedReason()
            )
          } else if (notification.isSkippedMoment()) {
            console.info(
              'One Tap was skipped:',
              notification.getSkippedReason()
            )
          } else if (notification.isDismissedMoment()) {
            console.log(
              'One Tap was dismissed:',
              notification.getDismissedReason()
            )
          } else {
            console.log('One Tap prompt displayed successfully.')
          }
        })

        setIsOneTapInitialized(true) // Mark as initialized
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes(
            'Only one navigator.credentials.get request may be outstanding at one time'
          )
        ) {
          console.log(
            'FedCM request already in progress. Waiting before retrying...'
          )
          setTimeout(initializeGoogleOneTap, 1000)
        } else {
          console.error('Error initializing Google One Tap:', error)
        }
      }
    }
  }, [session, handleCredentialResponse, isOneTapInitialized])

  useEffect(() => {
    if (isGoogleScriptLoaded) {
      initializeGoogleOneTap()
    }
  }, [isGoogleScriptLoaded, initializeGoogleOneTap])

  useEffect(() => {
    if (session) {
      // Cancel any ongoing One Tap prompts when the user is signed in
      window.google?.accounts.id.cancel()
    }
  }, [session])

  return (
    <Script
      src='https://accounts.google.com/gsi/client'
      async
      defer
      onLoad={() => setIsGoogleScriptLoaded(true)}
      strategy='afterInteractive' // Ensure the script loads early
    />
  )
}
