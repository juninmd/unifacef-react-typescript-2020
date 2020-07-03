import { configs } from './../configs/index';
import axios from 'axios';

const baseURL = configs.apis.starWars;

export const getFilms = () => {
  return axios.request({ baseURL, url: 'films' })
}

export const getFilmById = (id: number) => {
  return axios.request({ baseURL, url: `films/${id}` })
}