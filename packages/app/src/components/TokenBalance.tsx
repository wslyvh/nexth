'use client'
import { useBalance, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { toBigInt } from 'ethers'

const abi = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
] as const

interface TokenBalanceProps {
  readonly address: `0x${string}`
  readonly tokenAddress?: `0x${string}`
  readonly className?: string
  readonly toFixed?: number
}

export const TokenBalance = ({ address, tokenAddress, toFixed, className }: TokenBalanceProps) => {
  const ETHBalance = useBalance({ address })
  const tokenBalance = useReadContract({
    abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  const formatBalance = (balance: bigint) => {
    if (!balance) return null
    return parseFloat(formatEther(balance, 'wei')).toFixed(toFixed ?? 4)
  }
  if (!ETHBalance.data && !tokenBalance.data) return null
  if (tokenAddress) {
    return (
      <div className={`stat-value text-lg w-[150px] ${className}`}>
        {tokenBalance.data ? formatBalance(tokenBalance.data) : 0}
      </div>
    )
  }
  return (
    <div className={`stat-value text-lg w-[150px] ${className}`}>
      {formatBalance(ETHBalance.data?.value ?? toBigInt(0))}
    </div>
  )
}
