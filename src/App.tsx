import React, { useEffect } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import Cookies from 'js-cookie'
import { config } from '@/config'
import { setTokenForRequest, setRefreshTokenForRequest } from '@/api/common/AuthorizedRequest'
import '@/assets/index.scss'
import { $token } from '@/api/common/AuthorizedRequest'
import { IntroPages, MainRoutes, getRouterByName } from '@/routes'
import IntroLayout from '@/layouts/IntroLayout'
import MainLayout from './layouts/main-layout'

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey5)};
`

export const App: React.FC = () => {
  const token = useStore($token)
  useEffect(() => {
    const cookie = Cookies.get(config.TOKEN)
    if (cookie?.length) setTokenForRequest(cookie)
  }, [])
  return (
    <AppStyled>
      <Switch>
        {!token.length && <IntroLayout>
          {IntroPages.map((item) => (
            <Route
              path={getRouterByName(item.name).path}
              component={getRouterByName(item.name).component}
              key={item.name}
            />
          ))}
          <Redirect
            from={getRouterByName('login-page').path}
            to={getRouterByName('login-page').path}
          />
        </IntroLayout>}
        {token.length && <MainLayout>
          {MainRoutes.map((item) => (
            <Route
              path={getRouterByName(item.name).path}
              component={getRouterByName(item.name).component}
              key={item.name}
            />
          ))}
          <Redirect
            from={getRouterByName('profile-page').path}
            to={getRouterByName('profile-page').path}
          />
        </MainLayout>}
      </Switch>
    </AppStyled>
  )
}

export default withRouter(App)
