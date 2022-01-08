import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store, { history } from './store/configureStore'

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
