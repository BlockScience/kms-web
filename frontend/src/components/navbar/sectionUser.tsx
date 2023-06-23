import { IconLogin, IconLogout } from '@tabler/icons-react'
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  Skeleton,
  Button,
  ActionIcon,
  Center,
  Stack,
  createStyles,
  Loader,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = createStyles((theme) => ({
  base: {
    a: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: '...',
    },
  },
  baseButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}))

export default function User({ fullwidth }: { fullwidth: boolean }) {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0()

  const loginButton = (
    <Center>
      <ActionIcon
        size={30}
        variant='filled'
        color={theme.colorScheme == 'dark' ? 'green.9' : 'green.3'}
        onClick={() => loginWithRedirect()}
      >
        <IconLogin size='1rem' color={theme.colorScheme == 'dark' ? 'white' : 'black'} />
      </ActionIcon>
    </Center>
  )
  const loadingWide = (
    <Group align='center' style={{ padding: 9.5 }}>
      <Skeleton width={40} height={40} circle />
      <Box sx={{ flex: 1 }}>
        <Skeleton height={12} mb={10} width='85%' radius='xl' />
        <Skeleton height={8} mt={6} width='70%' radius='xl' />
      </Box>
    </Group>
  )
  const loadingCompact = (
    <Center>
      <Loader size={30} color='gray' />
    </Center>
  )
  const loginWide = (
    <Group grow>
      <Button color='green' onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    </Group>
  )
  const userAvater = (
    <Avatar alt='' radius='xl' color='gray' variant='filled'>
      {user?.name.slice(0, 2).toUpperCase()}
    </Avatar>
  )
  const userLoggedInSmall = () => {
    return (
      <Stack spacing='xs' pt='sm' className={classes.base}>
        <Center>
          <ActionIcon
            variant='default'
            color='red'
            size={30}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            <IconLogout
              size='1rem'
              color={theme.colorScheme === 'dark' ? theme.colors.gray[0] : 'black'}
            />
          </ActionIcon>
        </Center>
        <NavLink to='/settings' style={{ textDecoration: 'none' }} id='tour-userSettings'>
          <Center>
            <UnstyledButton className={classes.baseButton}>
              <Center>{userAvater}</Center>
            </UnstyledButton>
          </Center>
        </NavLink>
      </Stack>
    )
  }
  const userLoggedInLarge = () => {
    return (
      <Group noWrap position='apart' w='100%' className={classes.base}>
        <NavLink to='/settings' id='tour-userSettings'>
          <UnstyledButton
            className={classes.baseButton}
            style={{ whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis' }}
          >
            <Group noWrap spacing='xs'>
              {userAvater}
              <Box>
                <Text size='sm' weight={500}>
                  {user?.name}
                </Text>
                <Text color='dimmed' size='xs'>
                  {user?.email}
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        </NavLink>
        <ActionIcon
          variant='default'
          size={30}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          <IconLogout
            size='1rem'
            color={theme.colorScheme === 'dark' ? theme.colors.gray[0] : 'black'}
          />
        </ActionIcon>
      </Group>
    )
  }

  const collapsed = isLoading
    ? loadingCompact
    : !isAuthenticated
    ? loginButton
    : userLoggedInSmall()
  const expanded = isLoading ? loadingWide : !isAuthenticated ? loginWide : userLoggedInLarge()

  return <Box className={classes.container}>{fullwidth ? expanded : collapsed}</Box>
}
