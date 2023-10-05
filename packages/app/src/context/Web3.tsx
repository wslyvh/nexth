'use client'

import { configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/utils/site'
import { PropsWithChildren, useEffect, useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { ETH_CHAINS } from '@/utils/network'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}
const { chains } = configureChains(ETH_CHAINS, [publicProvider()])

const metadata = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  icons: [],
}
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Provider(props: PropsWithChildren) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return <>{ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}</>
}
