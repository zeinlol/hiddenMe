import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import React from 'react'

export interface AKNotificationBaseProps {
  title: string;
  message: string;
  color: string;
  icon?: JSX.Element;
}

const DEFAULT_NOTIFICATION_ICON = <IconX size="1rem" />

export function showNotificationBase({
  title, message, color, icon = DEFAULT_NOTIFICATION_ICON }: AKNotificationBaseProps) {
  notifications.show({
    title,
    message,
    color,
    icon,
    autoClose: 2000,
  })
}

export interface AKNotificationProps {
  message: string;
}
export function showNotificationFailed({ message }: AKNotificationProps) {
  return showNotificationBase({
    title: 'Failed',
    message,
    color: 'red',
  })
}
