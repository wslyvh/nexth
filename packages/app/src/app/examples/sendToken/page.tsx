'use client'
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransaction,
  usePrepareContractWrite,
  erc20ABI,
} from 'wagmi'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { parseEther } from 'viem'
import 'react-toastify/dist/ReactToastify.css'

import Token from '../../../assets/icons/token.png'

type Address = `0x${string}` | undefined

export default function SendToken() {
  const [to, setTo] = useState<Address>(undefined)
  const [amount, setAmount] = useState('0.01')
  const [tokenAddress, setTokenAddress] = useState<Address>(undefined)
  const [isValidTokenAddress, setIsValidTokenAddress] = useState<boolean>(false)
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)

  const { address } = useAccount()
  const { data: balanceData } = useBalance({
    token: isValidTokenAddress ? tokenAddress : undefined,
    address,
  })

  const { config, error: prepareError } = usePrepareContractWrite({
    address: balanceData && isValidToAddress ? tokenAddress : undefined,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [to!, parseEther(amount)],
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

  const handleTokenAddressInput = (token: string) => {
    if (token.startsWith('0x')) setTokenAddress(token as `0x${string}`)
    else setTokenAddress(`0x${token}`)
    setIsValidTokenAddress(ethers.utils.isAddress(token))
  }

  const handleToAdressInput = (to: string) => {
    if (to.startsWith('0x')) setTo(to as `0x${string}`)
    else setTo(`0x${to}`)
    setIsValidToAddress(ethers.utils.isAddress(to))
  }

  useEffect(() => {
    if (txSuccess) {
      toast.success('Transaction successful')
    } else if (txError) {
      toast.error(`Transaction failed: ${txError.message}`)
    }
  }, [txSuccess, txError, prepareError])

  const formatBalance = (balance: string) => {
    return Number.parseFloat(Number.parseFloat(balance).toFixed(2)).toExponential()
  }

  return (
    <div className='flex-column align-center '>
      <h1 className='text-xl'>Send ERC-20 Token</h1>
      <label className='form-control w-full mt-10'>
        <div className='label'>
          <span className='label-text'>ERC-20 Token address</span>
        </div>
        <input
          type='text'
          placeholder='0x...'
          className={`input input-bordered w-full ${
            !isValidTokenAddress && tokenAddress != undefined ? 'input-error' : ''
          }`}
          onChange={(e) => handleTokenAddressInput(e.target.value)}
        />
      </label>

      {isValidTokenAddress && balanceData && (
        <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 mt-10'>
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
                  <img className='opacity-25' width={50} src={Token.src} alt='token' />
                </div>
                <div className='stat-title '>Your balance</div>

                {balanceData.formatted ? (
                  <div className='stat-value text-lg w-[150px]'>{formatBalance(balanceData.formatted)}</div>
                ) : (
                  <p>Please connect your wallet</p>
                )}
              </div>
            </div>
            <button
              className='btn btn-wide '
              onClick={handleSendTransation}
              disabled={txLoading || isLoading || !isValidToAddress || amount === ''}>
              {isLoading || txLoading ? <span className='loading loading-dots loading-sm'></span> : 'Send ethers'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}