import {
  Image,
} from '@mantine/core'

export function AppIcon() {
  return (
    <Image
      src="/logo.svg"
      alt="hiddenMe logo"
      fit="contain"
      width={42}
      height={42}
    />
  )
}
