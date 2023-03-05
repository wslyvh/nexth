import { ThemingProps } from '@chakra-ui/react'
import { polygonMumbai } from '@wagmi/chains'
import { ethers } from 'ethers'

export const SITE_NAME = 'useWeb3 Learn'
export const SITE_DESCRIPTION = 'An open education platform to attest your knowledge and claim your ZK certifications.'
export const SITE_URL = 'https://useweb3-learn.vercel.app/'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'useWeb3'
export const SOCIAL_GITHUB = 'wslyvh/useWeb3'

export const ETH_CHAINS = [polygonMumbai]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const ETHERS_PROVIDER = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")

export const DEPLOYED_CONTRACTS = {
  TesterCreator: "0xECe4239a93F97e52aE88b64228d38e39195B9e9A",
  Credentials: "0xc8c0A832e04Ea78E46bDf0e133aB525840b1c53d",
  TestVerifier: "0x3561B5ccD0b058c80884E6a6Fa1205fb0d249c43",
}
