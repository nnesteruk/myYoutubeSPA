import { FC } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
};

export const Notify: FC = () => {
  return <ToastContainer />;
};
