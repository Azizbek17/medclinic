import axios from 'axios'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import appointments from '../redux/reducers/appointmentReducer'
import doctors from '../redux/reducers/doctorReducer'
import services from '../redux/reducers/serviceReducer'
import specialities from '../redux/reducers/specialityReducer'
import { loadState } from './localStorage'
import doctorTabsReducer from '../redux/reducers/doctorTabsReducer';

export const history = createBrowserHistory()

history.listen((location, action) => {
  window.scrollTo(50, 0)
})

const rootReducer = combineReducers({
  router: connectRouter(history),
  doctors,
  specialities,
  services,
  appointments,
  doctorTabsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunkMiddleware, routerMiddleware(history)]

const enhancers = composeEnhancers(applyMiddleware(...middleware))

const persistedState = loadState()

const store = createStore(rootReducer, persistedState, enhancers)

store.subscribe(() => {})

axios.interceptors.request.use((config) => {
  try {
    if (store.getState().users.SessionId) {
      config.headers['Session_Id'] = store.getState().user.SessionId
    }
  } catch (e) {
    // user is not logged
  }

  return config
})

export default store
