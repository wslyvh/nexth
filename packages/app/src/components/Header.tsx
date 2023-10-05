import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
      <LinkComponent href='/'>
        <h1 className='text-lg font-bold'>{SITE_NAME}</h1>
      </LinkComponent>

      <Connect />
    </header>
  )
}
