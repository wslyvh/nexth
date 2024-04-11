'use client'
import { useAccount, useBalance, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, formatEther, isAddress } from 'viem'
import { useState, useEffect } from 'react'
import { parseEther } from 'viem'
import { useToast } from '@/context/Toaster'
import Token from '@/assets/icons/token.png'

type Address = `0x${string}` | undefined

export default function SendToken() {
  const [to, setTo] = useState<Address>(undefined)
  const [amount, setAmount] = useState('0.01')
  const [tokenAddress, setTokenAddress] = useState<Address>(undefined)
  const [isValidTokenAddress, setIsValidTokenAddress] = useState<boolean>(false)
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)

  const { showToast } = useToast()

  const { address } = useAccount()
  const { data: balanceData } = useBalance({
    token: isValidTokenAddress ? tokenAddress : undefined,
    address,
  })

  const { error: estimateError } = useSimulateContract({
    address: balanceData && isValidToAddress ? tokenAddress : undefined,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [to!, parseEther(amount)],
  })

  const { data, writeContract } = useWriteContract()

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
    writeContract({
      address: tokenAddress!,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [to!, parseEther(amount)],
    })
  }

  const handleTokenAddressInput = (token: string) => {
    if (token.startsWith('0x')) setTokenAddress(token as `0x${string}`)
    else setTokenAddress(`0x${token}`)
    setIsValidTokenAddress(isAddress(token))
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
                <span className='label-text'>Number of tokens to send</span>
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
                  <img className='opacity-25 ml-10' width={50} src={Token.src} alt='token' />
                </div>
                <div className='stat-title '>Your balance</div>

                {balanceData ? (
                  <div className='stat-value text-lg w-[150px]'>{formatBalance(balanceData.value)}</div>
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
      )}
    </div>
  )
}
