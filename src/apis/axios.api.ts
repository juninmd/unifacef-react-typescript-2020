import { loadingOn, loadingOff } from '../components/loading/index';
import axios from 'axios';

axios.interceptors.request.use(async (config) => {
  loadingOn();
  return config;
}, (error) => {
  return Promise.reject(error);
});


axios.interceptors.response.use(async (config) => {
  loadingOff();
  return config;
}, (error) => {
  loadingOff();
  return Promise.reject(error);
});
