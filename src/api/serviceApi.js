import { api,handleResponse, handleError} from './apiUtils';
import { GET_SERVICE_LIST, GET_SERVICES_BY_DOCTOR } from '../global/Constants/service';

export function getServices(){
      return api.get(GET_SERVICE_LIST)
      .then(handleResponse)
      .catch(handleError);
}

export function getServicesByDoctor(data){
      return api.post(GET_SERVICES_BY_DOCTOR, data)
      .then(handleResponse)
      .catch(handleError);
}

