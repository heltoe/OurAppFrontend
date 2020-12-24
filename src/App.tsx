import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import '@/assets/index.scss'
import IntroLayout from '@/layouts/IntroLayout'
import { IntroPages, MainRoutes, getRouterByName } from '@/routes'
import MainLayout from './layouts/main-layout'

export const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        {/* <IntroLayout>
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
        </IntroLayout> */}
        <MainLayout>
          {MainRoutes.map((item) => (
            <Route
              path={getRouterByName(item.name).path}
              component={getRouterByName(item.name).component}
              key={item.name}
            />
          ))}
          <Redirect
            from={getRouterByName('chat-page').path}
            to={getRouterByName('chat-page').path}
          />
        </MainLayout>
      </Switch>
    </div>
  )
}

export default withRouter(App)
