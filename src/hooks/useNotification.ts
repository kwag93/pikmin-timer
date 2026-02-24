import { useState, useCallback } from 'react'

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && typeof Notification !== 'undefined'
      ? Notification.permission
      : 'default'
  )

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'denied' as const
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const notify = useCallback((title: string, options?: NotificationOptions) => {
    if (permission !== 'granted') return null
    try {
      return new Notification(title, {
        icon: '/icon-192.png',
        tag: 'pikmin-timer',
        ...options,
      })
    } catch {
      return null
    }
  }, [permission])

  return { permission, requestPermission, notify }
}
