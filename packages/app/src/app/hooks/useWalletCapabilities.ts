import { useEffect, useState } from 'react'
import { WalletCapabilities } from 'viem'
import { useEIP5792WalletClient } from './useEIP5792WalletClient'

function useWalletCapabilities({ chainId }: { chainId?: number }) {
  const { data: walletClient } = useEIP5792WalletClient()
  const [capabilities, setCapabilities] = useState<{ [chainId: number]: WalletCapabilities }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletClient) {
      walletClient
        .getCapabilities()
        .then((capabilities) => {
          setCapabilities(capabilities)
          setLoading(false)
        })
        .catch(() => {
          // handle wallets that don't support this RPC
          setLoading(false)
          setCapabilities({})
        })
    }
  }, [walletClient])

  return { capabilities: capabilities && chainId ? capabilities[chainId] : capabilities, loading }
}

export default useWalletCapabilities
