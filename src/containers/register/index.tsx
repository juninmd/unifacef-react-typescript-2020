import * as React from 'react';
import { Container, Grid, Header, Form } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import RegisterStore from './store';
import Cep from '../../components/cep';

interface Props {
  router: NewRouterStore;
  register: RegisterStore;
}

@inject('router', 'register')
@observer
export default class Register extends React.Component<Props> {

  render() {

    const { handleForm, zipcode } = this.props.register;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Register
                 <Header.Subheader>Simulação de formulário</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Informe o CEP</label>
              <input value={zipcode || ''} name='zipcode' onChange={handleForm} placeholder='Ex: 14405123' />
            </Form.Field>
            <Form.Field>
              <Cep zipCode={zipcode} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Container >
    );
  }
}
