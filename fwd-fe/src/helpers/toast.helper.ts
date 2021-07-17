import { toast, ToastOptions } from 'react-toastify';
import { get } from 'lodash';

const optionsError = {
  type: toast.TYPE.ERROR,
  closeButton: null,
  autoClose: 2000,
  className: 'custom-toast',
} as ToastOptions;

const optionsSuccess = {
  type: toast.TYPE.SUCCESS,
  closeButton: null,
  autoClose: 2000,
  className: 'custom-toast',
} as ToastOptions;

function _toastError(error: any, duration?: number) {
  const options = duration
    ? { ...optionsError, autoClose: duration }
    : optionsError;
  if (typeof error === 'string') {
    return toast(error, options);
  }
  if (error?.response) {
    // if (!(error.response.status === 401)) {
    return toast(
      Array.isArray(error.response?.data?.message)
        ? error.response?.data?.message[0]
        : error.response?.data?.message || error.message,
      options,
    );
  }
  // } else if (error.request) {
  //   return toast('Network error', options);
  // }

  return toast(error?.message || 'Unknown Error', options);
}

function _toastSuccess(success: any, duration?: number) {
  const options = duration
    ? { ...optionsSuccess, autoClose: duration }
    : optionsSuccess;
  if (typeof success === 'string') {
    return toast(success, options);
  }
  if (success.response) {
    return toast(
      get(success.response, 'data.message') || success.message,
      options,
    );
  }
  if (success.request) {
    return toast('Network error', options);
  }
  return toast(success.message, options);
}

class ToastInstance {
  toast: any = null;

  toastSuccess = (message: any, duration: number = 3000) => {
    if (!toast.isActive(this.toast)) {
      this.toast = _toastSuccess(message, duration);
    } else {
      toast.update(this.toast, {
        render: message,
        closeButton: null,
        autoClose: duration,
      });
    }
  };

  toastError = (message: any, duration: number = 3000) => {
    if (!toast.isActive(this.toast)) {
      this.toast = _toastError(message, duration);
    } else {
      toast.update(this.toast, {
        render: message,
        closeButton: null,
        autoClose: duration,
      });
    }
  };
}

const toastSuccessInstance = new ToastInstance();
const toastErrorInstance = new ToastInstance();

const { toastSuccess } = toastSuccessInstance;
const { toastError } = toastErrorInstance;

export { toastSuccess, toastError };
