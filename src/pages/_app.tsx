import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { Layout } from 'components/layout'
import { THEME_COLOR_SCHEME, THEME_CONFIG } from 'utils/config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={extendTheme(withDefaultColorScheme({ colorScheme: THEME_COLOR_SCHEME }), {
        ...THEME_CONFIG,
      })}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
