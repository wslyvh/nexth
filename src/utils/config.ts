import { ThemingProps } from '@chakra-ui/react'
import { optimism } from '@wagmi/chains'
import { ethers } from 'ethers'

export const SITE_NAME = 'useWeb3 Academy'
export const SITE_DESCRIPTION = 'Test your Web3 knowledge and claim your ZK certifications.'
export const SITE_URL = 'https://academy.useweb3.xyz'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'useWeb3'
export const SOCIAL_GITHUB = 'wslyvh/useWeb3'

export const ETH_CHAINS = [optimism]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const ETHERS_PROVIDER = new ethers.providers.JsonRpcProvider('')

export const DEPLOYED_CONTRACTS = {
  TestCreator: '0x879919ebA0A48B4AF966e2B43c16B17A906d4DE9',
  Credentials: '0x8002C94BDad20F64ACE040C74eBFE262c0A0aE25',
  TestVerifier: '0x23F5f7Fe1829f86C8C0bC35C4a2B068D664Eba9c',
}
