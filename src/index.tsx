import React from 'react'
import ReactDOM from 'react-dom'
import './assets/index.scss'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Theme from '@/Theme'
import App from '@/App'
import * as serviceWorker from './serviceWorker'

// создаём кастомную историю
const history = createBrowserHistory()

ReactDOM.render(
  <Theme>
    <Router history={history}>
      <App />
    </Router>
  </Theme>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
