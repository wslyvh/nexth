'use client'

import { Alert } from '@/components/Alert'
import { useNotifications } from '@/context/Notifications'

export default function NotificationsExample() {
  const { notifications, Add, Clear } = useNotifications()

  return (
    <div className='flex-column align-center '>
      <h2 className='text-2xl mb-2'>Notifications</h2>
      <p>This example is demonstrates how to use the notification system within Nexth.</p>

      <div className='flex flex-wrap gap-4 mt-4'>
        <button className='btn btn-sm btn-info' onClick={() => Add('Transaction sent..', { type: 'info' })}>
          Info
        </button>
        <button className='btn btn-sm btn-success' onClick={() => Add('Transaction completed!', { type: 'success' })}>
          Success
        </button>
        <button className='btn btn-sm btn-warning' onClick={() => Add('Unable to encode data', { type: 'warning' })}>
          Warning
        </button>
        <button className='btn btn-sm btn-error' onClick={() => Add('Failed. Execution reverted', { type: 'error' })}>
          Error
        </button>
        <button
          className='btn btn-sm btn-neutral'
          onClick={() =>
            Add('Transaction successfully completed!', {
              type: 'success',
              from: 'vitalik.eth',
              href: 'https://beaconcha.in/tx/9b629147b75dc0b275d478fa34d97c5d4a26926457540b15a5ce871df36c23fd',
            })
          }>
          Full example
        </button>

        <button className='btn btn-sm btn-link' onClick={Clear}>
          Clear
        </button>
      </div>

      <div className='mt-4'>
        <h3 className='text-lg mb-4'>{notifications.length} Notification(s)</h3>
        <div className='flex flex-col gap-2'>
          {notifications.map((notification, index) => {
            return (
              <Alert
                key={index}
                type={notification.type}
                message={notification.message}
                href={notification.href}
                timestamp={notification.timestamp}
                from={notification.from}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
