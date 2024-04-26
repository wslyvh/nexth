import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI } from '@/utils/site'
import { Connect } from './Connect'
import { NotificationsDrawer } from './NotificationsDrawer'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
      <LinkComponent href='/'>
        <h1 className='text-xl font-bold'>{SITE_EMOJI}</h1>
      </LinkComponent>

      <div className='flex gap-2'>
        <Connect />
        <NotificationsDrawer />
      </div>
    </header>
  )
}
