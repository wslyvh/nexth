'use client'

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/utils/site'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ETH_CHAINS } from '@/utils/network'
import { PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'

// 1. Setup Tanstack Query
const queryClient = new QueryClient()

// 2. Setup WalletConnect
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

const metadata = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  icons: [],
  verifyUrl: SITE_URL,
}

// 3. Setup Wagmi
const chains = ETH_CHAINS
const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  metadata,
  ssr: true,
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Provider(props: PropsWithChildren) {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
