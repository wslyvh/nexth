'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { WALLETCONNECT_CONFIG, WALLETCONNECT_PROJECT_ID } from '@/utils/web3'

interface Props extends PropsWithChildren {
  initialState?: State
}

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: WALLETCONNECT_CONFIG,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: true,
})

export function Web3Provider(props: Props) {
  return (
    <>
      <WagmiProvider config={WALLETCONNECT_CONFIG} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
