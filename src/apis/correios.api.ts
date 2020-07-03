import axios from 'axios';
import { configs } from '../configs';

const baseURL = configs.apis.correios;

export interface GetZipCode {
  resultado: string;
  resultado_txt: string;
  uf: string;
  cidade: string;
  bairro: string;
  tipo_logradouro: string;
  logradouro: string;
}

export const getZipCode = async (zipCode: number) => {
  const request = await axios.request<GetZipCode>({ baseURL, params: { cep: zipCode, formato: 'jsonp' } })
  if (request.data.cidade === '') {
    throw new Error('Cep não encontrado')
  }
  return request;
}