import { api, handleResponse, handleError} from './apiUtils';
import { GET_FREE_APPOINTMENTS, CREATE_APPOINTMENT, GET_BUSY_DAYS } from '../global/Constants/appointment';

export function createAppointment(appointment){  
       let data = Object.assign({}, appointment); 
       return api.post(CREATE_APPOINTMENT, data)
      .then(handleResponse)
      .catch(handleError);
}

export function getFreeAppointments(data){   
       return api.get(`${GET_FREE_APPOINTMENTS}?date=${data.date}&doctorId=${data.doctorId}&checkCurrentDate=${data.checkCurrentDate}`)
  .then(handleResponse)
  .catch(handleError);
}

export function getBusyDays(data){
       return api.get(`${GET_BUSY_DAYS}?month=${data.month}&year=${data.year}&doctorId=${data.doctorId}`)
  .then(handleResponse)
  .catch(handleError);
}