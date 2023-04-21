import { ThemingProps } from '@chakra-ui/react'
import { optimism, sepolia } from '@wagmi/chains'

export const SITE_NAME = 'GPS'
export const SITE_DESCRIPTION = 'Built with Nexth - a Next.js + Ethereum starter kit'
export const SITE_URL = 'https://passport-score-nft.vercel.app/'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'teal'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'wslyvh'
export const SOCIAL_GITHUB = 'wslyvh/nexth'

export const ETH_CHAINS = [optimism]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
