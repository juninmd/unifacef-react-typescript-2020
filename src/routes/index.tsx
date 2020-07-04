import * as React from 'react';
import { observer } from 'mobx-react';
import {
  Route,
  withRouter,
  Switch,
  Redirect,
} from 'react-router-dom';
import MainMenu from '../components/main-menu';
import { Divider } from 'semantic-ui-react';
import NotFound from '../containers/not-found';
import { endpoints, loginEndpoints } from './endpoints';
import { isLoggedIn } from '../utils/auth.util';

// @ts-ignore
@withRouter
@observer
export default class Routes extends React.Component {

  render() {
    return (
      <>
        {loginEndpoints.map((route, i) => (
          <Route key={i} {...route} />)
        )}
        {isLoggedIn() ?
          <>
            <MainMenu />
            <Divider hidden={true} />
            <Switch>
              {endpoints.map((route, i) => (
                <Route key={i} {...route} />)
              )}
              <Route path='*' exact={true} render={props => <NotFound {...props} />} />
            </Switch>
          </> : <Redirect to={{ pathname: 'login' }} />}
      </>
    );
  }
}