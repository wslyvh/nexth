'use client'
import { formatEther } from 'viem'

export const formatBalance = (balance: bigint, toFixed?: number) => {
  if (!balance) return undefined
  return parseFloat(formatEther(balance, 'wei')).toFixed(toFixed ?? 4)
}
