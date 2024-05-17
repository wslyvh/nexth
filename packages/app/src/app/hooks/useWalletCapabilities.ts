import { useEffect, useState } from 'react'
import { WalletCapabilities } from 'viem'
import { getCapabilities, walletActionsEip5792 } from 'viem/experimental'
import { useWalletClient } from 'wagmi'

function useWalletCapabilities({ chainId }: { chainId?: number }) {
  const { data: walletClient } = useWalletClient()
  const [capabilities, setCapabilities] = useState<{ [chainId: number]: WalletCapabilities }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletClient) {
      getCapabilities((walletClient as any).extend(walletActionsEip5792()), {
        account: walletClient.account,
      })
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
