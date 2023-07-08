import Navigation, { NavigationProps } from './sectionNavigation'
import { Header } from './sectionHeader'
import Search from './sectionSearch'
import User from './sectionUser'
import { Box, Divider, Stack, createStyles, px, useMantineTheme } from '@mantine/core'
import { useLocalStorage, useMediaQuery } from '@mantine/hooks'
import {
  IconAlertCircle,
  IconBinaryTree2,
  IconBrandGithub,
  IconBrandSlack,
  IconFileText,
  IconLayoutDashboard,
  IconMessages,
  IconTimeline,
} from '@tabler/icons-react'
import { useState } from 'preact/hooks'
const upperNavigation: NavigationProps[] = [
  {
    icon: <IconAlertCircle size={px('1rem')} />,
    color: 'teal',
    label: 'Governance',
    path: '/governance',
  },
  {
    icon: <IconLayoutDashboard size={px('1rem')} />,
    color: 'blue',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IconBinaryTree2 size={px('1rem')} />,
    color: 'violet',
    label: 'Schema',
    path: '/schema',
  },
  {
    icon: <IconTimeline size={px('1rem')} />,
    color: 'grape',
    label: 'Activity',
    path: '/activity',
  },
  {
    icon: <IconMessages size={px('1rem')} />,
    color: 'pink',
    label: 'Chat',
    path: '/chat',
  },
]

const lowerNavigation: NavigationProps[] = [
  {
    icon: <IconBrandSlack size={px('1rem')} />,
    color: 'gray',
    label: 'Slack',
    href: 'https://blockscienceteam.slack.com/archives/C029RATAVTJ',
  },
  {
    icon: <IconBrandGithub size={px('1rem')} />,
    color: 'gray',
    label: 'Github',
    href: 'https://github.com/blockScience/kms',
  },
  {
    icon: <IconFileText size={px('1rem')} />,
    color: 'gray',
    label: 'Documentation',
    path: '/docs',
  },
]

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
  },
  stack: {
    height: '100%',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.xs,
    paddingTop: theme.spacing.lg,
    justifyContent: 'space-between',

    '#navbarDivider': {
      width: '3px',
      right: '-1px', // should be -((width/2)-0.5)
      position: 'absolute',
      top: '0px',
      height: '100%',
      opacity: 0.9,
      zIndex: 999,
      transition: '0.2s background-color',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[3],
        transitionDelay: '0.2s',
        cursor: 'pointer',
      },
    },
  },
}))

export function Sidebar() {
  const [activeView, setActive] = useState([null, null])
  const [expanded, setExpanded] = useLocalStorage<boolean>({
    key: 'sidebar-prefer-expanded',
    defaultValue: true,
    getInitialValueInEffect: true,
  })

  const toggle = () => setExpanded((v) => !v)
  const theme = useMantineTheme()
  const bigScreen = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
  const fullWidthNav = bigScreen ? expanded : false
  const { classes } = useStyles()

  const upperNavLinks = upperNavigation.map((link, index) => (
    <Navigation
      {...link}
      key={link.label}
      active={index === activeView[1]}
      fullwidth={fullWidthNav}
      onLinkActive={() => link.path && setActive([null, index])}
    />
  ))
  const lowerNavLinks = lowerNavigation.map((link, index) => (
    <Navigation
      {...link}
      key={link.label}
      active={index === activeView[0]}
      fullwidth={fullWidthNav}
      onLinkActive={() => link.path && setActive([index, null])}
    />
  ))
  return (
    <Box id='navbarContainer' className={classes.container}>
      <Stack spacing='xs' className={classes.stack} w={expanded ? 280 : 70}>
        <Box id='navbarDivider' className='tour-toggleSidebar' onClick={toggle} />
        <Stack spacing='xs'>
          <Header fullwidth={fullWidthNav} onToggle={toggle} />
          <Divider />
          <Search fullwidth={fullWidthNav} />
          <Stack className='tour-navInternal' spacing={0}>
            {upperNavLinks}
          </Stack>
        </Stack>
        <Stack spacing='xs'>
          <Stack className='tour-navExternal' spacing={0}>
            {lowerNavLinks}
          </Stack>
          <Divider />
          <User fullwidth={fullWidthNav} />
        </Stack>
      </Stack>
    </Box>
  )
}
