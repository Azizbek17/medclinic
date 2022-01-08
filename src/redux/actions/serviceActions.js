import * as types from './actionTypes'
import * as serviceApi from '../../api/serviceApi'

export function loadServicesSuccess(services) {
  return { type: types.LOAD_SERVICES_SUCCESS, services }
}

export function loadServicesByDoctorSuccess(services) {
  return { type: types.LOAD_SERVICES_BY_DOCTOR_SUCCESS, services }
}

export function loadServices() {
  return function (dispatch) {
    return serviceApi
      .getServices()
      .then((services) => {
        dispatch(loadServicesSuccess(services))
      })
      .catch((error) => {
        throw error
      })
  }
}

export function loadServicesByDoctor(data) {
  return function (dispatch) {
    return serviceApi
      .getServicesByDoctor(data)
      .then((services) => {
        dispatch(loadServicesByDoctorSuccess(services))
      })
      .catch((error) => {
        throw error
      })
  }
}
