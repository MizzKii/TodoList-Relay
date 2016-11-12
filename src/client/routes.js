import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import { App, View } from './components'
import { viewerQuery } from './queries'

export default (
  <Route path="/" component={App} queries={viewerQuery}>
    <IndexRoute component={View} queries={viewerQuery} />
    <Redirect from="*" to="/" />
  </Route>
)
