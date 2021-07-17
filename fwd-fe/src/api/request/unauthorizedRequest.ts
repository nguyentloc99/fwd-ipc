import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { stringify } from 'query-string';
import CONFIG from '../../config';

const unauthorizedRequest: AxiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'comma' });
  },
});

unauthorizedRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    throw error;
  },
);

export default unauthorizedRequest;
