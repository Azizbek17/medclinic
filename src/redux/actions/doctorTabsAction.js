import * as types from './actionTypes'

export function setDoctorTabs(doctorTab) {
  return { type: types.DOCTOR_TABS, doctorTab }
}
