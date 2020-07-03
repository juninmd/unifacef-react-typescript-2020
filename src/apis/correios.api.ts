import axios from 'axios';

const baseURL = 'http://cep.republicavirtual.com.br/web_cep.php';

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
  return axios.request<GetZipCode>({ baseURL, params: { cep: zipCode, formato: 'jsonp' } })
}