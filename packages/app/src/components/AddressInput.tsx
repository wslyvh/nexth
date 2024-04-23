'use client'
import { useState } from 'react'
import { isAddress } from 'viem'
import { normalize } from 'viem/ens'
import { mainnet, sepolia } from 'wagmi/chains'
import { createConfig, useEnsAddress, http, useEnsAvatar } from 'wagmi'
import Image from 'next/image'

interface AddressInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  onRecipientChange: (address: string, isValid: boolean) => void
  onRawInputChange?: (address: string) => void
}
// wagmi config
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

function truncateAddress(address: string) {
  return `${address.slice(0, 8)}...${address.slice(-8)}`
}

export const AddressInput = ({ label, onRecipientChange, onRawInputChange }: AddressInputProps) => {
  const [isValidToAddress, setIsValidToAddress] = useState<boolean>(false)
  const [rawTokenAddress, setRawTokenAddress] = useState<string>('')
  let name

  try {
    name = normalize(rawTokenAddress)
  } catch (e) {
    console.error(e)
  }
  const { data: ensAddy } = useEnsAddress({
    name: name,
    config: config,
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: name,
    config: config,
  })

  // Handle input change for recipient address
  const handleToAdressInput = (_to: string) => {
    const isValid = isAddress(_to)
    setIsValidToAddress(isValid)

    // Update raw token address and notify parent component
    onRecipientChange(_to, isValid)
    setRawTokenAddress(_to)

    // Invoke optional callback for raw input change
    if (onRawInputChange) {
      onRawInputChange(_to)
    }
  }

  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label py-2'>
        <span className='label-text'>{label}</span>
      </div>
      <div className='relative flex flex-col gap-2'>
        <input
          type='text'
          placeholder='0x...'
          className={`input input-bordered w-full max-w-xs ${!isValidToAddress && rawTokenAddress && !ensAddy ? 'input-error' : isValidToAddress ? 'input-success' : ''}`}
          value={rawTokenAddress}
          onChange={(e) => handleToAdressInput(e.target.value)}
        />
        {ensAddy ? (
          <>
            {' '}
            {/* separator */}
            <div className='absolute bottom-[46px] right-0 h-[1px] w-full bg-gray-300' />
            <button
              onClick={() => {
                setRawTokenAddress(ensAddy ?? '')
                onRecipientChange(ensAddy ?? '', true)
                setIsValidToAddress(true)
              }}
              className={`flex flex-row relative top-2 z-40 w-full max-w-[240px] justify-between px-4 py-2 rounded shadow-lg bg-gray-50 text-black items-center hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105`}>
              {ensAvatar ? (
                <div className='avatar'>
                  <div className='w-8 rounded-full'>
                    <Image
                      width={320}
                      height={320}
                      content='responsive'
                      src={ensAvatar ?? ''}
                      alt='avatar'
                      placeholder='blur'
                      blurDataURL='/assets/icons/ethereum.png'
                      className={`${ensAvatar ? 'block' : 'hidden'} rounded-full min-w-8 min-h-8 w-8 h-8 object-cover relative`}
                    />
                  </div>
                </div>
              ) : (
                <div className='avatar placeholder'>
                  <div className='bg-neutral text-neutral-content items-start rounded-full w-8'>
                    <span className='text-lg relative bottom-0'>{rawTokenAddress[0]}</span>
                  </div>
                </div>
              )}
              <span>{truncateAddress(ensAddy ?? '')}</span>
            </button>
          </>
        ) : null}
      </div>
    </label>
  )
}
