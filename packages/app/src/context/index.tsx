'use client'

import { PropsWithChildren } from 'react'
import { Web3Provider } from './Web3'
import { DataProvider } from './Data'
import { NotificationProvider } from './Notifications'

interface Props extends PropsWithChildren {
  cookies: string | null
}

export function Providers(props: Props) {
  return (
    <>
      <Web3Provider cookies={props.cookies}>
        <DataProvider>
          <NotificationProvider>{props.children}</NotificationProvider>
        </DataProvider>
      </Web3Provider>
    </>
  )
}
