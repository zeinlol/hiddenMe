import {
  createStyles,
  Title,
  Image,
  Flex,
  Paper,
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
      direction="column"
      wrap="wrap"
    >
      <Image
        src="/logo.png"
        alt="hiddenMe logo"
        fit="contain"
        width={150}
        height={150}
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
