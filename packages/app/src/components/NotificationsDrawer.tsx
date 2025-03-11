'use client'

import React from 'react'
import { BellIcon as BellOutline, XCircleIcon } from '@heroicons/react/24/outline'
import { BellIcon as BellSolid } from '@heroicons/react/24/solid'
import { useNotifications } from '@/context/Notifications'
import { Alert } from './Alert'

export function NotificationsDrawer() {
  const { notifications, Clear } = useNotifications()
  const className = 'shrink-0 h-5 w-5'

  return (
    <div className='drawer drawer-end'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          htmlFor='my-drawer'
          role='button'
          className={`btn btn-ghost btn-sm ${notifications.length === 0 ? 'text-gray-600' : ''} drawer-button`}>
          {notifications.length > 0 && <BellSolid className={className} />}
          {notifications.length === 0 && <BellOutline className={className} />}
        </label>
      </div>

      <div className='drawer-side z-1'>
        <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
        <div className='p-4 w-full md:w-1/2 min-h-full bg-base-100'>
          <div className='flex justify-between'>
            {notifications.length === 0 && <h3 className='text-lg mb-4'>No notifications</h3>}
            {notifications.length > 0 && <h3 className='text-lg mb-4'>{notifications.length} Notification(s)</h3>}
            <span
              role='button'
              className='px-2'
              onClick={() => {
                document.getElementById('my-drawer')?.click()
              }}>
              <XCircleIcon className='shrink-0 h-6 w-6 cursor-pointer' />
            </span>
          </div>
          {notifications.length > 0 && (
            <div className='flex flex-col gap-2'>
              {notifications.map((notification, index) => (
                <Alert
                  key={`notification_${index}_${notification.timestamp}`}
                  type={notification.type}
                  message={notification.message}
                  href={notification.href}
                  timestamp={notification.timestamp}
                  from={notification.from}
                />
              ))}
              <div className='place-self-end'>
                <button className='btn btn-xs btn-link inline' onClick={Clear}>
                  Clear notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
