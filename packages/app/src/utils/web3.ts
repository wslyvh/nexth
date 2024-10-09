import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { ETH_CHAINS } from './network'

export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

export const WALLETCONNECT_ADAPTER = new WagmiAdapter({
  projectId: WALLETCONNECT_PROJECT_ID,
  networks: ETH_CHAINS,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
