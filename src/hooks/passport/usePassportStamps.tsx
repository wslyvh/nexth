import { useState, useEffect } from 'react'
import { State, PassportStamp } from 'types'
import { useAccount } from 'wagmi'

//** Fetches all the stamps that are connected to the current account. */
export function usePassportStamps(withMetadata: boolean = false) {
  const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY
  if (!API_KEY) {
    console.warn('Gitcoin Passport API Key not set')
  }

  const { address, isConnected } = useAccount()
  const [state, setState] = useState<State<PassportStamp[]>>({
    loading: true,
    error: undefined,
    data: undefined,
  })

  useEffect(() => {
    const getStamps = async () => {
      const response = await fetch(`https://api.scorer.gitcoin.co/registry/stamps/${address}?include_metadata=${withMetadata}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY ?? '',
        },
      })

      const data = await response.json()

      if (response.status === 200) {
        // TODO: Check "next" property and paginate if necessary.
        setState({
          loading: false,
          error: undefined,
          data: data.items,
        })
        return
      }

      console.log('Unable to get passport stamps')
      setState({
        loading: false,
        error: data.detail ?? 'Unable to get passport stamps',
        data: undefined,
      })
    }

    if (API_KEY && isConnected && address) {
      getStamps()
    }
  }, [API_KEY, address, isConnected])

  return state
}
