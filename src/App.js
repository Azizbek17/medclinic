import React from 'react'
import { withRouter } from 'react-router-dom'
import Routes from './Routes'

function App() {
  return (
    <React.Fragment>
      <Routes />
    </React.Fragment>
  )
}

export default withRouter(App)
