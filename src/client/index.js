import 'babel-polyfill'

import React from 'react'
import Relay from 'react-relay'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'
import { render } from 'react-dom'
import routes from './routes'

render (
  <Router
    history={browserHistory}
    routes={routes}
    render={applyRouterMiddleware(useRelay.default)}
    environment={Relay.Store}
  />,
  document.getElementById('container')
)
