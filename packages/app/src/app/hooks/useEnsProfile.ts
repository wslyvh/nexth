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

  const name = normalizedName()

  const { data: ensAddress } = useEnsAddress({ name, chainId: 1 })
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: ensTextData } = useEnsText({ name, chainId: 1, key: key ?? 'text' })

  return { ensAddress, ensAvatar, ensTextData }
}

export default useEnsProfile
