import * as types from './actionTypes'
import * as doctorApi from '../../api/doctorApi'

export function loadDoctorsSuccess(doctors) {
  return { type: types.LOAD_DOCTORS_SUCCESS, doctors }
}

export function loadDoctors() {
  return function (dispatch) {
    return doctorApi
      .getDoctors()
      .then((doctors) => {
        dispatch(loadDoctorsSuccess(doctors))
      })
      .catch((error) => {
        throw error
      })
  }
}
