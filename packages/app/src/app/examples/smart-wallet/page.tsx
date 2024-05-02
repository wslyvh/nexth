'use client'
import { nexthFtAbi } from '@/abis'
import { useSWWriteContracts } from '@/app/hooks/useSWWriteContract'
import useWalletCapabilities from '@/app/hooks/useWalletCapabilities'
import { TruncateMiddle } from '@/utils/format'
import React from 'react'
import { useAccount } from 'wagmi'

enum BADGE_CLASSES {
  CONNECTED = 'badge-success',
  CONNECTING = 'badge-warning',
  DISCONNECTED = 'badge-error',
}

export default function SmartWallet() {
  const account = useAccount()
  const { capabilities, loading } = useWalletCapabilities({ chainId: 84532 })
  const { id, writeContracts } = useSWWriteContracts()

  const badgeClass = account?.isConnecting
    ? BADGE_CLASSES.CONNECTING
    : account.isConnected
      ? BADGE_CLASSES.CONNECTED
      : BADGE_CLASSES.DISCONNECTED

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between gap-8'>
        <div className='flex-col flex gap-8 justify-between h-full align-center '>
          <h1 className='text-xl'>Smart wallet demo</h1>
          <div className='flex flex-col gap-2 align-self-end'>
            <p className='label-text max-w-60'>
              Click &apos; connect &apos; and select the &apos;Coinbase Wallet&apos; to demo the smart wallet
              capabilities
            </p>
          </div>
          <div className='flex flex-col gap-8 justify-between h-full'>
            <p className={`indicator-item badge ${badgeClass}`}>status: {account?.status}</p>
            {account.isConnected ? (
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                  <p className='label-text'>capabilities</p>
                  <table className='table table-compact'>
                    <thead>
                      <tr>
                        <th>capability</th>
                        <th>supported</th>
                      </tr>
                    </thead>
                    <tbody className={`${account.isConnected && loading ? 'loading relative left-40 min-h-20' : ''}`}>
                      {capabilities && !loading
                        ? Object.entries(capabilities).map(([key, value]) => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{value.supported.toString()}</td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='label-text'>addresses: </p>
                  <p>{JSON.stringify(account?.addresses)}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='label-text'>chainId: </p>
                  <p>{account?.chainId}</p>
                </div>
              </div>
            ) : null}
          </div>
          {account?.address && (
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl'>Transact</h1>
              <div className='flex-flex-col space-y-4'>
                <p className='label-text max-w-60'>
                  This transaction demonstrates the smart wallet multicall capabilities. It will mint 2 NFT tokens to
                  your address using a multicall transaction.
                </p>
                <button
                  className='btn btn-outline btn-wide'
                  onClick={() =>
                    writeContracts({
                      contracts: [
                        {
                          address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
                          abi: nexthFtAbi,
                          functionName: 'safeMint',
                          args: [account?.address],
                        },
                        {
                          address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
                          abi: nexthFtAbi,
                          functionName: 'safeMint',
                          args: [account?.address],
                        },
                      ],
                    })
                  }>
                  Mint
                </button>
                {id && (
                  <div className='max-w-full'>
                    <p className='w-full whitespace-pre-wrap'> ID: {TruncateMiddle(id)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-4 justify-between h-full'>
          <h1 className='text-xl'>Links:</h1>
          <ol className='flex flex-col gap-4'>
            <a className='link link-primary  btn-wide' href='https://github.com/coinbase/smart-wallet'>
              <li>Coinbase Smart Wallet Github</li>
            </a>
            <a className='link link-primary  btn-wide' href='https://docs.cloud.coinbase.com/wallet-sdk/docs/sw-setup'>
              <li>Coinbase Smart Wallet Documentation</li>
            </a>
          </ol>
        </div>
      </div>
    </>
  )
}
