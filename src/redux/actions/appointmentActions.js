import * as types from './actionTypes'
import * as appointmentApi from '../../api/appointmentApi'

export function loadFreeAppointmentsSuccess(appointments) {
  return { type: types.LOAD_FREE_APPOINTMENTS_SUCCESS, appointments }
}

export function createAppointmentSuccess(appointment) {
  return { type: types.CREATE_APPOINTMENT_SUCCESS, appointment }
}

export function loadBusyDaysSuccess(days) {
  return { type: types.LOAD_BUSY_DAYS_SUCCESS, days }
}

export function loadFreeAppointments(data) {
  return function (dispatch) {
    return appointmentApi
      .getFreeAppointments(data)
      .then((appointments) => {
        dispatch(loadFreeAppointmentsSuccess(appointments))
      })
      .catch((error) => {
        throw error
      })
  }
}

export function createAppointment(appointment) {
  return function (dispatch) {
    return appointmentApi
      .createAppointment(appointment)
      .then((savedAppointment) => {
        dispatch(createAppointmentSuccess(savedAppointment))
      })
      .catch((error) => {
        throw error
      })
  }
}

export function loadBusyDays(data) {
  return function (dispatch) {
    return appointmentApi
      .getBusyDays(data)
      .then((days) => {
        dispatch(loadBusyDaysSuccess(days))
      })
      .catch((error) => {
        throw error
      })
  }
}
