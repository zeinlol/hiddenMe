import {
  Image,
} from '@mantine/core'

export function AppIcon() {
  return (
    <Image
      src="/logo.png"
      alt="hiddenMe logo"
      fit="contain"
      width={50}
      height={50}
    />
  )
}
