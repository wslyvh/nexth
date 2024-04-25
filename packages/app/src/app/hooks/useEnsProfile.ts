import { useState, useEffect } from 'react'
import { normalize } from 'viem/ens'
import { useEnsAddress, useEnsAvatar, useEnsText } from 'wagmi'

const useEnsProfile = ({ ensName, key }: { ensName: string; key?: string }) => {
  const [name, setName] = useState<string>('')

  useEffect(() => {
    try {
      const normalized = normalize(ensName)
      setName(normalized)
    } catch (e) {
      console.error(e)
    }
  }, [ensName])

  const { data: ensAddress } = useEnsAddress({ name, chainId: 1 })
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: ensTextData } = useEnsText({ name, chainId: 1, key: key ?? 'text' })

  return { ensAddress, ensAvatar, ensTextData }
}

export default useEnsProfile
