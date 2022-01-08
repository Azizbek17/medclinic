import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnlineRecord from './containers/Pages/OnlineRecord/OnlineRecord'
import SharePage from './containers/Pages/SharePage/SharePage'
import { ROUTE_RECORD, SHARE_PAGE } from './global/Constants/Constants'

const Routes = () => {
  return (
    <Switch>
      <Route path={ROUTE_RECORD} exact component={OnlineRecord} />
      <Route path={SHARE_PAGE} component={SharePage}/>
    </Switch>
  )
}

export default Routes
