import * as types from './actionTypes'
import * as userApi from '../../api/userApi'

export function authSuccess(user) {
  return { type: types.AUTH, user }
}

export function authWebApiUser() {
  return function (dispatch) {
    return userApi
      .auth()
      .then((user) => {
        dispatch(authSuccess(user))
        localStorage.setItem('Session_Id', user.SessionId)
      })
      .catch((error) => {
        throw error
      })
  }
}
