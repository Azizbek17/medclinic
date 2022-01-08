import * as types from '../actions/actionTypes'

const initState = {
  doctorTab: 'все',
}

export default function doctorTabsReducer(state = initState, action) {
  switch (action.type) {
    case types.DOCTOR_TABS:
      return { ...state, doctorTab: action.doctorTab }
    default:
      return state
  }
}
