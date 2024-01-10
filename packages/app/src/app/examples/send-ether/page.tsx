'use client'
import { useAccount, useBalance, useSendTransaction, useWaitForTransaction, usePrepareSendTransaction } from 'wagmi'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { parseEther } from 'viem'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Ethereum from '../../../assets/icons/ethereum.png'

export default function SendEther() {
  const [to, setTo] = useState('')
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)
  const [amount, setAmount] = useState('0.01')

  const { address } = useAccount()
  const balance = useBalance({
    address,
  })

  const { config, error: prepareError } = usePrepareSendTransaction({
    to: isValidToAddress ? to : undefined,
    value: parseEther(amount),
  })

  const { data, isLoading, sendTransaction } = useSendTransaction(config)

  const {
    isSuccess: txSuccess,
    error: txError,
    isLoading: txLoading,
  } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleSendTransation = () => {
    if (prepareError) {
      toast.error(`Transaction failed: ${prepareError.cause}`)
      return
    }
    sendTransaction?.()
  }

  const handleToAdressInput = (to: string) => {
    if (to.startsWith('0x')) setTo(to as `0x${string}`)
    else setTo(`0x${to}`)
    setIsValidToAddress(ethers.utils.isAddress(to))
  }

  useEffect(() => {
    if (txSuccess) {
      toast.success('Transaction successful')
      balance.refetch()
    } else if (txError) {
      toast.error(`Transaction failed : ${txError.message}`)
    }
  }, [txSuccess, txError])

  const formatBalance = (balance: string) => {
    return Number.parseFloat(Number.parseFloat(balance).toFixed(2)).toExponential()
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
              className='input input-bordered w-full max-w-xs'
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className='flex-col justify-end m-2'>
          <div className='stats shadow join-item w-[256px] mb-2 bg-[#282c33]'>
            <div className='stat '>
              <div className='stat-figure text-secondary'>
                <img width={50} className='opacity-25' src={Ethereum.src} alt='ethereum' />
              </div>
              <div className='stat-title '>Your balance</div>

              {balance.data?.formatted ? (
                <div className='stat-value text-lg w-[150px]'>{formatBalance(balance.data!.formatted)}</div>
              ) : (
                <p>Please connect your wallet</p>
              )}
            </div>
          </div>
          <button
            className='btn btn-wide '
            onClick={handleSendTransation}
            disabled={!isValidToAddress || !address || txLoading || isLoading || to === '' || amount === ''}>
            {isLoading || txLoading ? <span className='loading loading-dots loading-sm'></span> : 'Send ethers'}
          </button>
        </div>
      </div>
    </div>
  )
}
