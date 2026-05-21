import { useCallback } from 'react'
import { normalize, toCoinType } from 'viem/ens'
import { useEnsAddress, useEnsAvatar, useEnsText } from 'wagmi'

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
  const coinType = chainId !== undefined ? toCoinType(chainId) : undefined

  const { data: ensAddress } = useEnsAddress({ name, chainId: 1, coinType })
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: ensTextData } = useEnsText({ name, chainId: 1, key: key ?? 'text' })

  return { ensAddress, ensAvatar, ensTextData }
}

export default useEnsProfile
