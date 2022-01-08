import axios from 'axios';
import { BASE_URL } from '../global/Constants/Constants';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Session_Id': localStorage.getItem("Session_Id")
    }
  });

 async function handleResponse(response){    
    if(response.data.IsSuccess){
        return response.data.Data;
    }
    else{
        const error = response.data.Message; 
        throw new Error(error);
    }
}

 function handleError(error){
    throw error;
}

export { api, handleResponse, handleError };