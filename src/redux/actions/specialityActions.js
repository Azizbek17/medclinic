import * as types from './actionTypes'
import * as specialityApi from '../../api/specialityApi'

export function loadSpecialitiesSuccess(specialities) {
  return { type: types.LOAD_SPECIALITIES_SUCCESS, specialities }
}

export function loadSpecialities() {
  return function (dispatch) {
    return specialityApi
      .getSpecialities()
      .then((specialities) => {
        dispatch(loadSpecialitiesSuccess(specialities))
      })
      .catch((error) => {
        throw error
      })
  }
}
