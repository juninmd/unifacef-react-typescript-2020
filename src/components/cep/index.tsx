import React, { useState, useEffect } from "react";
import { getZipCode, GetZipCode } from "../../apis/correios.api";
import { Card, Segment, Loader, Image, Icon } from 'semantic-ui-react';
import Swal from 'sweetalert2';

interface Props {
  zipCode?: number;
}
export default function Cep(props: Props) {

  const [address, setAddress] = useState<GetZipCode>();

  useEffect(() => {
    const addressBlank: GetZipCode = {
      bairro: '',
      cidade: '',
      logradouro: '',
      resultado: '',
      resultado_txt: '',
      tipo_logradouro: '',
      uf: ''
    };

    async function getNewAddress(zipCode: number) {
      try {
        const response = await getZipCode(zipCode);
        setAddress(response.data);
      } catch (error) {
        Swal.fire(error.message, '', 'warning');
        setAddress(addressBlank);
      }
    }

    if (props.zipCode?.toString().length === 8) {
      getNewAddress(props.zipCode);
    } else {
      setAddress(undefined);
    }

  }, [props]);

  if (!address && !props.zipCode) {
    return <Segment>
      <p>Informe um número de CEP</p>
    </Segment>
  }

  if (!address?.cidade) {
    return <Segment>
      <Loader active={true} />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>{address.cidade} - {address.uf}</Card.Header>
        <Card.Meta>{address.bairro}</Card.Meta>
        <Card.Description>
          {address.tipo_logradouro} {address.logradouro}
        </Card.Description>
      </Card.Content>
      <Card.Content extra={true}>
        <Icon name='tree' />{props.zipCode}
      </Card.Content>
    </Card>
  );
}