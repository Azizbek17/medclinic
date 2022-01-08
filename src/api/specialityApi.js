import {api, handleResponse, handleError} from './apiUtils';
import { GET_SPECIALITY_LIST } from '../global/Constants/speciality';

export function getSpecialities(){
      return api.get(GET_SPECIALITY_LIST)
      .then(handleResponse)
      .catch(handleError);
}