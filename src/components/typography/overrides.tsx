import { Title, Text, Image, Anchor } from '@mantine/core'
import { ComponentChildren } from 'preact'

interface CommonProps {
  children: ComponentChildren
  src?: string
  href?: string
}

export const common = {
  p: ({ children }: CommonProps) => <Text pt={4}>{children}</Text>,
  h1: ({ children }: CommonProps) => (
    <Title mt={15} order={1}>
      {children}
    </Title>
  ),
  h2: ({ children }: CommonProps) => (
    <Title mt={15} order={2}>
      {children}
    </Title>
  ),
  h3: ({ children }: CommonProps) => (
    <Title mt={15} order={3}>
      {children}
    </Title>
  ),
  h4: ({ children }: CommonProps) => (
    <Title mt={15} order={4}>
      {children}
    </Title>
  ),
  img: ({ src }: CommonProps) => <Image my={20} src={src} />,
  a: ({ href, children }: CommonProps) => (
    <Anchor href={href}>{children}</Anchor>
  ),
}
