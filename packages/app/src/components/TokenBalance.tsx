'use client'
import { useBalance, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { toBigInt } from 'ethers'
import { useEffect } from 'react'

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
  readonly onBalanceChange?: ({
    balance,
    formattedBalance,
  }: {
    balance: bigint
    formattedBalance: string | null
  }) => void
}

const formatBalance = (balance: bigint, toFixed?: number) => {
  if (!balance) return null
  return parseFloat(formatEther(balance, 'wei')).toFixed(toFixed ?? 4)
}

export const TokenBalance = ({ address, tokenAddress, toFixed, onBalanceChange, className }: TokenBalanceProps) => {
  const ETHBalance = useBalance({ address })
  const tokenBalance = useReadContract({
    abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    // pass the value of the balance to the parent component on change
    if (tokenBalance.data && onBalanceChange) {
      onBalanceChange({ balance: tokenBalance.data, formattedBalance: formatBalance(tokenBalance.data, toFixed) })
      return
    } else if (ETHBalance.data && onBalanceChange) {
      onBalanceChange({
        balance: ETHBalance.data.value,
        formattedBalance: formatBalance(ETHBalance.data.value, toFixed),
      })
      return
    }
  }, [ETHBalance.data, tokenBalance.data, onBalanceChange, toFixed])

  if (!ETHBalance.data && !tokenBalance.data) return null
  if (tokenAddress && tokenBalance.data) {
    return (
      <div className={`stat-value text-lg w-[150px] ${className}`}>{formatBalance(tokenBalance.data, toFixed)}</div>
    )
  }
  return (
    <div className={`stat-value text-lg w-[150px] ${className}`}>
      {formatBalance(ETHBalance.data?.value ?? toBigInt(0), toFixed)}
    </div>
  )
}
