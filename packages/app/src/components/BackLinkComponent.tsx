import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { LinkComponent } from './LinkComponent'

export function BackLinkComponent() {
  return (
    <LinkComponent href='/'>
      <div className='flex items-center mb-4'>
        <ArrowLeftIcon className='w-5 h-5 mr-1' />
        <span>Back</span>
      </div>
    </LinkComponent>
  )
}
