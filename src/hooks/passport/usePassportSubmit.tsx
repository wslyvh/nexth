import { useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'

export function usePassportSubmit() {
  const COMMUNITY_ID = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_COMMUNITY_ID
  const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY
  if (!COMMUNITY_ID || !API_KEY) {
    console.warn('Gitcoin Passport Community ID or API Key not set')
  }

  const { data: signer } = useWalletClient()
  const { address, isConnected } = useAccount()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const headers = API_KEY
    ? {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      }
    : undefined

  async function submit(withSigningMessage?: boolean) {
    if (!signer || !isConnected) return
    setSubmitting(true)

    try {
      const body: {
        address: string | undefined
        community: string | undefined
        signature?: string | undefined
        nonce?: string | undefined
      } = {
        address,
        community: COMMUNITY_ID,
      }

      if (withSigningMessage) {
        // Get nonce from Gitcoin
        const signResponse = await fetch(`https://api.scorer.gitcoin.co/registry/signing-message`, {
          headers,
        })
        const { message, nonce } = await signResponse.json()

        // Sign message
        let signature: string
        try {
          signature = await signer.signMessage({
            message: message,
          })
          body.signature = signature
          body.nonce = nonce
        } catch (e) {
          setError('Unable to sign message')
          return
        }
      }

      // Submit Passport to Gitcoin
      const response = await fetch(`https://api.scorer.gitcoin.co/registry/submit-passport`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })

      if (response.status !== 200) {
        setError('Unable to submit passport')
        return
      }
    } catch (e) {
      console.error('failed to submit passport for scoring: ', e)
      setError('Unable to submit passport')
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, error }
}
