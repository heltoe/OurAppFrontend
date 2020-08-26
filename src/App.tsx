import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import '@/assets/index.scss'
import IntroLayout from '@/layouts/IntroLayout'
import { getRouterByName } from '@/routes'

console.log(4545)

export const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <IntroLayout>
          <Route
            path={getRouterByName('login-page').path}
            component={getRouterByName('login-page').component}
          />
          <Route
            path={getRouterByName('registration-page').path}
            component={getRouterByName('registration-page').component}
          />
          <Route
            path={getRouterByName('restore-password-page').path}
            component={getRouterByName('restore-password-page').component}
          />
          <Redirect
            from={getRouterByName('login-page').path}
            to={getRouterByName('login-page').path}
          />
        </IntroLayout>
      </Switch>
    </div>
  )
}

export default withRouter(App)
