import { useEffect, useState } from 'react'
import { Account, Chain, Transport, WalletClient } from 'viem'
import {
  type Config,
  type UseWalletClientParameters,
  type UseWalletClientReturnType,
  useWalletClient,
  ResolvedRegister,
} from 'wagmi'
import { WalletActionsEip5792, walletActionsEip5792 } from 'viem/experimental'
import { GetWalletClientData } from 'wagmi/query'

type EIP5792WalletClient<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = WalletClient<Transport, chain, account> & WalletActionsEip5792<chain, account>

export function useEIP5792WalletClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId> & EIP5792WalletClient,
>(
  parameters: UseWalletClientParameters<config, chainId, selectData> = {}
): UseWalletClientReturnType<config, chainId, selectData> {
  const { data: originalWalletClient, ...rest } = useWalletClient(parameters)
  const [walletClient, setWalletClient] = useState<EIP5792WalletClient | undefined>(undefined)

  useEffect(() => {
    if (originalWalletClient) {
      setWalletClient((originalWalletClient as any).extend(walletActionsEip5792()))
    }
  }, [originalWalletClient])

  return { data: walletClient, ...rest } as any
}
