'use client'
import { parseEther, isAddress, Address } from 'viem'
import { useEstimateGas } from 'wagmi'

// const { data: estimateData, error: estimateError } = useEstimateGas({
//   to: isValidToAddress ? (to as Address) : undefined,
//   value: parseEther(amount),
// })

export function useGasEstimation(to: Address | undefined, amount: string) {
  const {
    data: estimateGasData,
    error: estimateGasError,
    isLoading: estimateGasLoading,
    isSuccess: estimateGasSuccess,
  } = useEstimateGas({
    to: isAddress(to as string) ? (to as Address) : undefined,
    value: parseEther(amount),
    // maxFeePerGas: parseGwei(gasPrice),
  })

  return {
    estimateGasData,
    estimateGasError,
    estimateGasLoading,
    estimateGasSuccess,
  }
}
