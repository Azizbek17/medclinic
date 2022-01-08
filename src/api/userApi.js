import { api, handleResponse, handleError } from './apiUtils';
import { LOGIN_URL } from '../global/Constants/user';

export function auth() {
  return api.get(LOGIN_URL)
    .then(handleResponse)
    .catch(handleError);
}