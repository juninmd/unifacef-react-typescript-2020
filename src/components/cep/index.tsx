import React, { useState, useEffect } from "react";
import { getZipCode, GetZipCode } from "../../apis/correios.api";

interface Props {
  zipCode: number;
}
export default function Cep(props: Props) {

  const addressBlank = { bairro: '', cep: '', complemento: '', gia: '', ibge: '', localidade: '', logradouro: '', uf: '', unidade: '' };

  const [address, setAddress] = useState<GetZipCode>(addressBlank);

  async function getNewAddress(zipCode: number) {
    try {
      const response = await getZipCode(zipCode);
      setAddress(response.data);
    } catch (error) {
      setAddress(addressBlank);
    }
  }

  useEffect(() => {
    getNewAddress(props.zipCode);
  }, [getNewAddress, props.zipCode]);

  if (!address) {
    return <p>"loading...";</p>
  }

  return (
    <details>
      <summary>{address.bairro}</summary>
      <strong>{address.localidade}</strong>
    </details>
  );
}