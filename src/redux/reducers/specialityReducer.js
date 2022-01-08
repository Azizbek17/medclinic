import * as types from '../actions/actionTypes'

export default function specialityReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_SPECIALITIES_SUCCESS:
      return action.specialities
    default:
      return state
  }
}
