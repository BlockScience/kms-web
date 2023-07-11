import { withAuthenticationRequired } from '@auth0/auth0-react'
import { PageLoading } from '@/components/PageLoading'
import { ComponentChildren } from 'preact'

interface AuthRequiredProps {
  component: ComponentChildren
}
export const AuthRequired = ({ component }: AuthRequiredProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: PageLoading,
  })
  return <Component />
}
