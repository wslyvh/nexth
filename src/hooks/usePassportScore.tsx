import { GetScore } from 'clients/passport'
import { useState, useEffect } from 'react'
import { State } from 'types'
import { useAccount } from 'wagmi'

export function usePassportScore(round?: boolean, reloadData?: number) {
  const { address, isConnected } = useAccount()
  const [state, setState] = useState<State<number>>({
    loading: true,
    error: undefined,
    data: undefined,
  })

  useEffect(() => {
    const getPassport = async () => {
      const data = await GetScore(address as string)
      if (data) {
        setState({
          loading: false,
          error: undefined,
          data: round ? Math.round(Number(data.score)) : Math.round(Number(data.score) * 100) / 100,
        })
        return
      }

      setState({
        loading: false,
        error: 'Unable to get passport score',
        data: undefined,
      })
    }

    if (isConnected && address) {
      getPassport()
    }
  }, [address, isConnected, round, reloadData])

  return state
}
