import axios from 'axios';
import { apiUrl } from 'shared/config';

export const instance = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
