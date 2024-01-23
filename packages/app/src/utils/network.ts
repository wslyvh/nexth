import { mainnet, sepolia, polygon, optimism, arbitrum, Chain, hardhat } from 'viem/chains'

let chains = [mainnet, sepolia, polygon, optimism, arbitrum] as [Chain, ...Chain[]]

if (process.env.NODE_ENV !== 'production') chains.push(hardhat)

export const ETH_CHAINS = chains

export function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'

  return 'grey'
}
