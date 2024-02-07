import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/site'
import { Layout } from '@/components/Layout'
import { Web3Provider } from '@/context/Web3'
import { ToastProvider } from '@/context/Toaster'
import { cookieToInitialState } from 'wagmi'
import { WALLETCONNECT_CONFIG } from '@/utils/web3'
import { headers } from 'next/headers'
import '../assets/globals.css'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
}

export default function RootLayout(props: PropsWithChildren) {
  const initialState = cookieToInitialState(WALLETCONNECT_CONFIG, headers().get('cookie'))

  return (
    <html lang='en'>
      <body>
        <Web3Provider initialState={initialState}>
          <ToastProvider>
            <Layout>{props.children}</Layout>
          </ToastProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
