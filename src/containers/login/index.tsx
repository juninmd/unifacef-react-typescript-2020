import * as React from 'react';
import { Form, Input, Divider, Segment, Grid, Button, Card } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import LoginStore from './store';
import { logOff, isLoggedIn } from '../../utils/auth.util';
import './style.css';
import Logo from '../../components/logo';

interface Props {
  router: NewRouterStore;
  login: LoginStore;
  match: any;
}

@inject('router', 'login')
@observer
export default class Login extends React.Component<Props> {

  componentWillMount = () => {
    const { path } = this.props.match;
    if (path === '/logout') {
      logOff();
      return;
    }

    const { setHistory } = this.props.router;

    if (isLoggedIn()) {
      setHistory('home');
    }
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();
    const { handleSubmit } = this.props.login;
    const logged = handleSubmit();
    if (logged) {
      const { setHistory } = this.props.router;
      setHistory('home');
    }
  }

  render() {
    const { handleForm, password, email } = this.props.login;
    return (
      <section className='login'>
        <Divider hidden={true} />

        <Form size='large' onSubmit={this.handleSubmit}>
          <Card.Group centered>
            <Card centered>
              <Card.Content>
                <Logo />
              </Card.Content>
            </Card>
          </Card.Group>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column width='4'>
              <Segment color='green'>

                <Form.Field>
                  <label>E-Mail:</label>
                  <Input
                    name='email'
                    minLength={3}
                    maxLength={20}
                    className={'uppercase'}
                    placeholder='ex: jr_acn@yahoo.com.br'
                    value={email}
                    type='email'
                    icon='user'
                    iconPosition={'left'}
                    onChange={handleForm}
                    required={true} />
                </Form.Field>

                <Form.Field>
                  <label>Senha</label>
                  <Input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='EX: 123'
                    onChange={handleForm}
                    icon='lock'
                    iconPosition={'left'}
                    minLength={3}
                    maxLength={15}
                    autoComplete={'current-password'}
                    required={true} />
                </Form.Field>

                <Form.Field width='6'>
                  <Button icon={'unlock'} labelPosition={'left'} fluid={true} positive={true} content={'Acessar'} title='Acessar' />
                </Form.Field>

              </Segment>
            </Grid.Column>
          </Grid>

        </Form >

      </section>
    );
  }
}
