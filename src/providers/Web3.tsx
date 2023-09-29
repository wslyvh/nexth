import { configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ETH_CHAINS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, THEME_COLOR_SCHEME } from 'utils/config'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

interface Props {
  children: ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}
const { chains } = configureChains(ETH_CHAINS, [publicProvider()])

const metadata = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  icons: ['https://avatars.githubusercontent.com/u/89189176'],
}
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains, themeVariables: { '--w3m-accent': THEME_COLOR_SCHEME } })

export function Web3Provider(props: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return <>{ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}</>
}
