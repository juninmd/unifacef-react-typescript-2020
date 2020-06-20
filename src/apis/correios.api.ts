import axios from 'axios';

const baseURL = 'https://viacep.com.br';

export interface GetZipCode {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

export const getZipCode = async (zipCode: number) => {
  return axios.request<GetZipCode>({ baseURL, url: `ws/${zipCode}/json/` })
}