import { ThemingProps } from '@chakra-ui/react'
import { mainnet, sepolia, optimism } from '@wagmi/chains'

export const SITE_NAME = 'useWeb3 Academy'
export const SITE_DESCRIPTION = 'Test your Web3 knowledge and claim your ZK certifications.'
export const SITE_URL = 'https://useweb3-learn.vercel.app/'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'useWeb3'
export const SOCIAL_GITHUB = 'wslyvh/useWeb3'

export const ETH_CHAINS = [mainnet, sepolia, optimism]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
