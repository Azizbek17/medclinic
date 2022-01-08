import * as consts from '../../constants.json';

export const TIMES = [
    '7:00',
    '8:00',
    '9:00'//,
   /* {time: '10:00'},
    {time: '11:00'},
    {time: '12:00'},
    {time: '13:00'},
    {time: '14:00'},
    {time: '15:00'},
    {time: '16:00'},
    {time: '17:00'},
    {time: '18:00'},*/
];

export const currentDate = new Date();

export const ROUTE_RECORD = '/';
export const SHARE_PAGE = '/share'

export const BASE_URL = `${consts.PROXY ? consts.PROXY_URL : ''}${consts.baseUrl}`
