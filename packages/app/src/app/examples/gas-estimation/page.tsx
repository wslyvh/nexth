'use client'

import { useAccount, useBalance, useEstimateGas } from 'wagmi'
import { useState, useEffect } from 'react'
import { parseEther, isAddress, parseGwei } from 'viem'
import Ethereum from '@/assets/icons/ethereum.png'
import { useNotifications } from '@/context/Notifications'
import { formatBalance } from '@/utils/formatBalance'
import { TokenBalance } from '@/components/TokenBalance'
import { TokenQuantityInput } from '@/components/TokenQuantityInput'
import { BackLinkComponent } from '@/components/BackLinkComponent'

type Address = `0x${string}` | undefined

export default function GasEstimation() {
  const [to, setTo] = useState<Address>(undefined)
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)
  const [amount, setAmount] = useState('0.01')
  const [gasPrice, setGasPrice] = useState('20')
  const [estimatedGas, setEstimatedGas] = useState<bigint | undefined>(undefined)

  const { Add } = useNotifications()

  const { address } = useAccount()

  const balance = useBalance({
    address,
  })

  const {
    data: estimateGasData,
    error: estimateGasError,
    isLoading,
    isSuccess: estimateGasSuccess,
  } = useEstimateGas({
    to: isValidToAddress ? (to as Address) : undefined,
    value: parseEther(amount),
    maxFeePerGas: parseGwei(gasPrice),
    // gasPrice: parseGwei(gasPrice),
  })

  const estimateGas = async () => {
    try {
      setEstimatedGas(estimateGasData)
    } catch (error) {
      console.error('Error estimating gas:', error)
    }
  }

  const handleToAdressInput = (to: string) => {
    if (to.startsWith('0x')) setTo(to as `0x${string}`)
    else setTo(`0x${to}`)
    setIsValidToAddress(isAddress(to))
  }

  useEffect(() => {
    if (estimateGasSuccess) {
      Add(`Gas Estimated successful`, {
        type: 'success',
      })
      balance.refetch()
    } else if (estimateGasError) {
      Add(`Gas Estimated failed: ${estimateGasError.cause}`, {
        type: 'error',
      })
    }
  }, [estimateGasSuccess, estimateGasError])

  return (
    <>
      <BackLinkComponent />
      <div className='flex-column align-center '>
        <h1 className='text-xl'>Gas Estimation Tool</h1>
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
                <span className='label-text'>Amount (ETH)</span>
              </div>
              <TokenQuantityInput
                onChange={setAmount}
                quantity={amount}
                maxValue={formatBalance(balance?.data?.value ?? BigInt(0))}
              />
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Gas Price (Gwei)</span>
              </div>
              <input
                type='text'
                className={`input input-bordered w-full max-w-xs`}
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
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
                {address ? <TokenBalance address={address} /> : <p>Please connect your wallet</p>}
              </div>
            </div>
            <button
              onClick={estimateGas}
              className='btn btn-wide w-[100%] '
              disabled={!isValidToAddress || !address || Boolean(estimateGasError) || amount === ''}>
              {isLoading ? <span className='loading loading-dots loading-sm'></span> : 'Estimate Gas'}
            </button>

            {estimatedGas !== undefined && (
              <p className='mt-4 text-lg'>Estimated Gas Cost: {estimatedGas.toString()}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
