import * as types from '../actions/actionTypes'

export default function doctorReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_DOCTORS_SUCCESS:
      return action.doctors
    default:
      return state
  }
}
