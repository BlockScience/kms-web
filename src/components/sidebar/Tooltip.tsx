import { Tooltip } from '@mantine/core'
import { ComponentChildren, VNode } from 'preact'

interface NavTooltipProps {
  label: string
  disable?: boolean
  children: JSX.Element
}
export const NavTooltip = ({
  label,
  disable,
  children,
}: NavTooltipProps): JSX.Element => {
  if (disable) return children
  return (
    <Tooltip
      label={label}
      position='right'
      withArrow
      arrowSize={8}
      openDelay={500}
      color='gray'
    >
      {children}
    </Tooltip>
  )
}
