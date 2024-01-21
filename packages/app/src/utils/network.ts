import { mainnet, sepolia, polygon, optimism, arbitrum, Chain, hardhat } from 'viem/chains'

export const ETH_CHAINS = [
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  process.env.NODE_ENV != 'production' ? hardhat : undefined,
] as [Chain, ...Chain[]]

export function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'

  return 'grey'
}
