import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ETH_CHAINS, THEME_COLOR_SCHEME } from 'utils/config'
import { useColorMode } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import { Web3Modal } from '@web3modal/react'

interface Props {
  children: ReactNode
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!projectId) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}
const { chains, publicClient, webSocketPublicClient } = configureChains(ETH_CHAINS, [publicProvider(), w3mProvider({ projectId: projectId })])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 2, chains, projectId: projectId }),
  publicClient,
  webSocketPublicClient,
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode={colorMode}
        themeVariables={{
          '--w3m-accent-color': THEME_COLOR_SCHEME,
        }}
      />
    </>
  )
}
