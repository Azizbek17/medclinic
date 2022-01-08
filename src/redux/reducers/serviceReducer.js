import * as types from '../actions/actionTypes'

export default function serviceReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_SERVICES_SUCCESS:
      return action.services
    case types.LOAD_SERVICES_BY_DOCTOR_SUCCESS:
      return action.services
    default:
      return state
  }
}
