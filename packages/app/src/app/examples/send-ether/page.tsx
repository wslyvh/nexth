'use client'
import { useAccount, useBalance, useEstimateGas, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { useState, useEffect } from 'react'
import { parseEther, formatEther, isAddress } from 'viem'
import { useToast } from '@/context/Toaster'
import Ethereum from '@/assets/icons/ethereum.png'

type Address = `0x${string}` | undefined

export default function SendEther() {
  const [to, setTo] = useState<Address>(undefined)
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)
  const [amount, setAmount] = useState('0.01')

  const { showToast } = useToast()

  const { address } = useAccount()
  const balance = useBalance({
    address,
  })

  const { data: estimateData, error: estimateError } = useEstimateGas({
    to: isValidToAddress ? (to as Address) : undefined,
    value: parseEther(amount),
  })

  const { data, sendTransaction } = useSendTransaction()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendTransation = () => {
    if (estimateError) {
      showToast(`Transaction failed: ${estimateError.cause}`, {
        type: 'error',
      })
      return
    }
    sendTransaction({
      gas: estimateData,
      value: parseEther(amount),
      to: (to as Address)!,
    })
  }

  const handleToAdressInput = (to: string) => {
    if (to.startsWith('0x')) setTo(to as `0x${string}`)
    else setTo(`0x${to}`)
    setIsValidToAddress(isAddress(to))
  }

  useEffect(() => {
    if (txSuccess) {
      showToast(`Transaction successful`, {
        type: 'success',
      })
      balance.refetch()
    } else if (txError) {
      showToast(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError])

  const formatBalance = (balance: bigint) => {
    return parseFloat(formatEther(balance, 'wei')).toFixed(4)
  }

  return (
    <div className='flex-column align-center '>
      <h1 className='text-xl'>Send Ether</h1>
      <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
        <div className='flex-col m-2 '>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Recipient address</span>
            </div>
            <input
              type='text'
              placeholder='0x...'
              className={`input input-bordered w-full max-w-xs ${
                !isValidToAddress && to != undefined ? 'input-error' : ''
              }`}
              onChange={(e) => handleToAdressInput(e.target.value)}
            />
          </label>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text'>Number of ethers to send</span>
            </div>
            <input
              type='text'
              placeholder='0.01'
              value={amount}
              className='input input-bordered w-full max-w-xs'
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className='flex-col justify-end m-2'>
          <div className='stats shadow join-item mb-2 bg-[#282c33]'>
            <div className='stat '>
              <div className='stat-figure text-secondary'>
                <img width={50} className='opacity-50 ml-10' src={Ethereum.src} alt='ethereum' />
              </div>
              <div className='stat-title '>Your balance</div>

              {balance.data ? (
                <div className='stat-value text-lg w-[150px]'>{formatBalance(balance.data!.value)}</div>
              ) : (
                <p>Please connect your wallet</p>
              )}
            </div>
          </div>
          <button
            className='btn btn-wide w-[100%] '
            onClick={handleSendTransation}
            disabled={!isValidToAddress || !address || Boolean(estimateError) || amount === ''}>
            {isLoading ? <span className='loading loading-dots loading-sm'></span> : 'Send ethers'}
          </button>
        </div>
      </div>
    </div>
  )
}
