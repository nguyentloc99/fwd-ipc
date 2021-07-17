import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import { stringify } from 'query-string';

const authorizedRequest: AxiosInstance = axios.create({
  baseURL: 'https://api.fwd.co.th/dev-ecommerce/',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'bracket' });
  },
});

authorizedRequest.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  newConfig.headers.common['Postman-Token'] = "7454ba0a-cbf4-4282-aee6-56e6125718b2"
  newConfig.params = {
    ...newConfig.params,
  };
  return newConfig;
});



export default authorizedRequest;
