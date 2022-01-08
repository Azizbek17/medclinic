import {api, handleResponse, handleError} from './apiUtils';
import { GET_DOCTOR_LIST } from '../global/Constants/doctor';
import { getPhotos, getNearestFreeTime } from './../constants.json'

export function getDoctors(){
      return api
        .get(`${GET_DOCTOR_LIST}?isShowInSchedule=true`, {
          params: {
            isShowPhoto: getPhotos ? true : '',
            isAddNearestFreeTime: getNearestFreeTime ? true : '',
          },
        })
        .then(handleResponse)
        .catch(handleError)
}

// &isShowPhoto=true&isAddNearestFreeTime=true