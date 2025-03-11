'use client'

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Notification } from '@/utils/types'
import { useAccount } from 'wagmi'
import dayjs from 'dayjs'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/notifications.css'
import { StatusIcon } from '@/components/Alert'

type NotificationOptions = Partial<Omit<Notification, 'message'>>

interface NotificationContext {
  Add: (message: string, options?: NotificationOptions) => void
  Clear: () => void
  notifications: Notification[]
}

const defaultNotificationContext: NotificationContext = {
  Add: () => {},
  Clear: () => {},
  notifications: [],
}

const NotificationContext = createContext(defaultNotificationContext)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }

  return context
}

export function NotificationProvider(props: PropsWithChildren) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { address } = useAccount()

  useEffect(() => {
    const storedNotifications = localStorage?.getItem('notifications')
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
  }, [])

  function Add(message: string, options?: NotificationOptions) {
    const notification: Notification = {
      message,
      type: options?.type || 'info',
      timestamp: options?.timestamp || dayjs().valueOf(),
      from: options?.from || address,
      ...options,
    }
    localStorage.setItem('notifications', JSON.stringify([...notifications, notification]))
    setNotifications([...notifications, notification])
    toast(message, { type: notification.type, icon: <StatusIcon type={notification.type} /> })
  }

  function Clear() {
    localStorage.removeItem('notifications')
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ Add, Clear, notifications }}>
      {props.children}
      <ToastContainer
        limit={5}
        theme='dark'
        position='bottom-center'
        toastClassName={() => 'flex relative bg-base-300 rounded-xl justify-between overflow-hidden p-2 mb-2'}
        bodyClassName={() => 'flex text-sm gap-2 px-4 py-2'}
      />
    </NotificationContext.Provider>
  )
}
