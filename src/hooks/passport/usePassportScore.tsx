import { useState, useEffect } from 'react'
import { State } from 'types'
import { useAccount } from 'wagmi'

export function usePassportScore(round?: boolean) {
  const COMMUNITY_ID = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_COMMUNITY_ID
  const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY
  if (!COMMUNITY_ID || !API_KEY) {
    console.warn('Gitcoin Passport Community ID or API Key not set')
  }

  const { address, isConnected } = useAccount()
  const [state, setState] = useState<State<number>>({
    loading: true,
    error: undefined,
    data: undefined,
  })

  useEffect(() => {
    const getPassport = async () => {
      const response = await fetch(`https://api.scorer.gitcoin.co/registry/score/${COMMUNITY_ID}/${address}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY ?? '',
        },
      })

      const data = await response.json()
      if (response.status === 200) {
        setState({
          loading: false,
          error: undefined,
          data: round ? Math.round(Number(data.score)) : Math.round(Number(data.score) * 100) / 100,
        })
        return
      }

      console.log('Unable to get passport score')
      setState({
        loading: false,
        error: data.detail ?? 'Unable to get passport score',
        data: undefined,
      })
    }

    if (API_KEY && COMMUNITY_ID && isConnected && address) {
      getPassport()
    }
  }, [API_KEY, COMMUNITY_ID, round, address, isConnected])

  return state
}
