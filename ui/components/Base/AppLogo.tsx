import {
  createStyles,
  Title,
  Image,
  Flex,
  MantineTheme,
} from '@mantine/core'

const useStyles = createStyles((theme: MantineTheme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

export function AppLogo() {
  const { classes } = useStyles()
  return (
    <Flex
      mih={80}
      gap="md"
      justify="flex-center"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Image
        src="/logo.svg"
        alt="hiddenMe logo"
        fit="contain"
        width={42}
        height={42}
      />
      <Title
        order={2}
        className={classes.title}
        ta="center"
        mt="md"
        mb={10}
      >Hidden Me
      </Title>
    </Flex>
  )
}
