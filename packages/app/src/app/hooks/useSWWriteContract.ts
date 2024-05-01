import { WriteContractsParameters } from 'viem/experimental'
import { useEIP5792WalletClient } from './useEIP5792WalletClient'
import { useState } from 'react'

export function useSWWriteContracts() {
  const { data: walletClient } = useEIP5792WalletClient()
  const [id, setId] = useState<string | undefined>(undefined)

  const writeContracts = (parameters: Omit<WriteContractsParameters, 'account' | 'chain'>) => {
    if (!walletClient) {
      throw new Error('Wallet client not available')
    }
    // TODO better types on useEIP5792WalletClient should give us account and chain "for free"
    walletClient
      .writeContracts({
        account: walletClient.account,
        chain: walletClient.chain,
        ...parameters,
      })
      .then((id) => {
        setId(id)
      })
  }

  return { id, writeContracts }
}
