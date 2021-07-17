import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { stringify } from 'query-string';
import { Languages } from 'constants/i18n.const';
import CONFIG from '../../config';
import { tokenManager } from './tokenManager';
import { languageManager } from './languageManager';

const authorizedRequest: AxiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'bracket' });
  },
});

authorizedRequest.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  const { token } = tokenManager;
  newConfig.headers.common.Authorization =
    token && token !== 'guest' ? `Bearer ${token}` : '';
  newConfig.params = {
    ...newConfig.params,
    lang: languageManager.lang || Languages.ENGLISH,
  };
  return newConfig;
});

authorizedRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError<any>) => {
    if (error && error.response && error.response.status === 401) {
      tokenManager.doLogout();
      return;
    }
    throw error;
  },
);

export default authorizedRequest;
