import * as React from 'react';
import { Container, Grid, Header, Form, Dropdown, Card } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import CoronaStore from './store';
import Summary from '../../components/summary';
import Country from '../../components/country';

interface Props {
  router: NewRouterStore;
  corona: CoronaStore;
}

@inject('router', 'corona')
@observer
export default class Corona extends React.Component<Props> {

  async componentDidMount() {
    const { getCountries, getSummary } = this.props.corona;
    await Promise.all([getCountries(), getSummary()]);
  }

  render() {
    const { summary, countriesFiltered, countriesOptions, countryCode, handleForm } = this.props.corona;
    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Corona
                 <Header.Subheader>Sumário Mundial {(new Date()).toLocaleDateString()}</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row>
            <Card.Group doubling={true} itemsPerRow={1}>
              <Summary global={summary?.Global} />
            </Card.Group>
          </Grid.Row>
          <Grid.Row>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Dropdown
                    placeholder='Selecione um país'
                    fluid
                    selection
                    search={true}
                    name='countryCode'
                    value={countryCode}
                    clearable={true}
                    onChange={handleForm}
                    options={countriesOptions}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Grid.Row>

          <Grid.Row>
            <Card.Group itemsPerRow={countryCode ? 1 : 3}>
              {countriesFiltered?.map((country, indexCountry) => <Country key={indexCountry} country={country} />)}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Container >
    );
  }
}
