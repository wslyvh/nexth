import { WriteContractsParameters, walletActionsEip5792 } from 'viem/experimental'
import { useState } from 'react'
import { useWalletClient } from 'wagmi'
import { writeContracts as writeContractsExperimental } from 'viem/experimental'

export function useSWWriteContracts() {
  const { data: walletClient } = useWalletClient()
  const [id, setId] = useState<string | undefined>(undefined)

  const writeContracts = (parameters: Omit<WriteContractsParameters, 'account' | 'chain'>) => {
    if (!walletClient) {
      throw new Error('Wallet client not available')
    }
    // TODO better types on useEIP5792WalletClient should give us account and chain "for free"
    writeContractsExperimental(walletClient.extend(walletActionsEip5792()), {
      account: walletClient.account,
      chain: walletClient.chain,
      ...parameters,
    }).then((id) => {
      setId(id)
    })
  }

  return { id, writeContracts }
}
