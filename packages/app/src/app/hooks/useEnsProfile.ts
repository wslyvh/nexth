import { useCallback } from 'react'
import { normalize } from 'viem/ens'
import { useEnsAddress, useEnsAvatar, useEnsText } from 'wagmi'

const useEnsProfile = ({ ensName, key }: { ensName: string; key?: string }) => {
  const normalizedName = useCallback(() => {
    try {
      return normalize(ensName)
    } catch (e) {
      return ''
    }
  }, [ensName])

  const { data: ensAddress } = useEnsAddress({ name: normalizedName(), chainId: 1 })
  const { data: ensAvatar } = useEnsAvatar({ name: normalizedName(), chainId: 1 })
  const { data: ensTextData } = useEnsText({ name: normalizedName(), chainId: 1, key: key ?? 'text' })

  return { ensAddress, ensAvatar, ensTextData }
}

export default useEnsProfile
