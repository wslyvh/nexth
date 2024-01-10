import { mainnet, sepolia, polygon, optimism, arbitrum, hardhat } from '@wagmi/core/chains'

export const ETH_CHAINS = [mainnet, sepolia, polygon, optimism, arbitrum, hardhat]

export function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'

  return 'grey'
}
