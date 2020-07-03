import axios from 'axios';

const baseURL = 'https://star-wars-api-unifacef.herokuapp.com';

export const getFilms = () => {
  return axios.request({ baseURL, url: 'films' })
}

export const getFilmById = (id: number) => {
  return axios.request({ baseURL, url: `films/${id}` })
}