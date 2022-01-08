import { BASE_URL } from './Constants';

export const GET_FREE_APPOINTMENTS = `${BASE_URL}api/Appointment/GetFreeAppointment`;
export const CREATE_APPOINTMENT = `${BASE_URL}api/Appointment/CreateAppointmentFromSiteByUniqueId`;
export const GET_BUSY_DAYS = `${BASE_URL}api/Appointment/GetBusyDays`;