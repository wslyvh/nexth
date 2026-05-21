import { useCallback } from 'react'
import { normalize } from 'viem/ens'
import { useEnsAddress, useEnsAvatar, useEnsText } from 'wagmi'

// Convert an EVM chainId to its ENS coin type (EIP-2304).
// ETH mainnet is the special-case coin type 60; all other EVM chains use 0x80000000 | chainId.
function evmChainIdToCoinType(chainId: number): number {
  if (chainId === 1) return 60
  return (0x80000000 | chainId) >>> 0
}

const useEnsProfile = ({ ensName, key, chainId }: { ensName: string; key?: string; chainId?: number }) => {
  const normalizedName = useCallback(() => {
    // Only attempt resolution for inputs that look like a name (contain a dot).
    if (!ensName.includes('.') || ensName.length <= 2) return ''
    try {
      return normalize(ensName)
    } catch {
      return ''
    }
  }, [ensName])

  const name = normalizedName()
  const coinType = chainId !== undefined ? evmChainIdToCoinType(chainId) : undefined

  const { data: ensAddress } = useEnsAddress({ name, chainId: 1, coinType })
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: ensTextData } = useEnsText({ name, chainId: 1, key: key ?? 'text' })

  return { ensAddress, ensAvatar, ensTextData }
}

export default useEnsProfile
