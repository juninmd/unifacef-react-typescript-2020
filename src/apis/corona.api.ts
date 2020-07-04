import axios from 'axios';
import { configs } from '../configs';

const baseURL = configs.apis.corona;

export interface IGlobal {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface ICountry {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

export interface ISummary {
  Global: IGlobal;
  Countries: ICountry[];
}

export const getSummary = () => {
  return axios.request<ISummary>({ baseURL, url: 'summary' })
}

export interface ICountry {
  Country: string;
  Slug: string;
  ISO2: string;
}

export const getCountries = () => {
  return axios.request<ICountry[]>({ baseURL, url: 'countries' })
}