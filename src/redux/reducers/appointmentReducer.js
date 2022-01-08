import * as types from '../actions/actionTypes'

export default function appointmentReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_FREE_APPOINTMENTS_SUCCESS:
      return action.appointments
    case types.CREATE_APPOINTMENT_SUCCESS:
      return [...state, { ...action.appointment }]
    case types.LOAD_BUSY_DAYS_SUCCESS:
      return action.days
    default:
      return state
  }
}
