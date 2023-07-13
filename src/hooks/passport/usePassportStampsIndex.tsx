import { useState, useEffect } from 'react'
import { State } from 'types'

//** Fetches all the stamps that are available on Passport */
export function usePassportStampsIndex() {
  const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY
  if (!API_KEY) {
    console.warn('Gitcoin Passport API Key not set')
  }

  const [state, setState] = useState<State<any[]>>({
    loading: true,
    error: undefined,
    data: undefined,
  })

  useEffect(() => {
    const getStampsIndex = async () => {
      const response = await fetch(`https://api.scorer.gitcoin.co/registry/stamp-metadata`, {
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
          data: data,
        })
        return
      }

      console.log('Unable to get passport stamps index')
      setState({
        loading: false,
        error: data.detail ?? 'Unable to get passport stamps index',
        data: undefined,
      })
    }

    if (API_KEY) {
      getStampsIndex()
    }
  }, [API_KEY])

  return state
}
