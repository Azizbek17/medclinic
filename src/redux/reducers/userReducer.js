import * as types from '../actions/actionTypes'

const initialState = {
  loading: false,
  user: null,
  error: null,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH:
      return { ...state, loading: true }
    case types.AUTH_SUCCESS:
      return { ...state, user: action.payload.user, loading: false }
    case types.AUTH_FAIL:
      const error =
        action.payload && action.payload.user
          ? action.payload.user.Message
          : 'Server error'
      return { ...state, user: null, loading: false, error }
    default:
      return state
  }
}
