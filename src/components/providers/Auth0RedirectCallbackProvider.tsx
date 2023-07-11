import { useNavigate } from 'react-router-dom'
import { Auth0Provider, AppState } from '@auth0/auth0-react'
import { auth0 } from '@/config'
import { ComponentChildren } from 'preact'

export const Auth0RedirectProvider = ({
  children,
}: { children: ComponentChildren }) => {
  const navigate = useNavigate()
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }
  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={auth0.domain}
      clientId={auth0.clientID}
      authorizationParams={{
        audience: auth0.audience,
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  )
}
