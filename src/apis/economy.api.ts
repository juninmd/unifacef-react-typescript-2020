import axios from 'axios';
import { configs } from '../configs';

export const getPrice = () => {
  return axios.request({ baseURL: configs.apis.economia })
}