import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import * as store from './mobx';
import Routes from './routes';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { router } from './mobx/';
import { Router } from 'react-router-dom';
import { SentryError } from './components/sentry-error';
import { syncHistoryWithStore } from 'mobx-react-router';
import './index.css';
import './plugins/sentry.plugin';
import './plugins/one-signal.plugin';
import 'semantic-ui-css/semantic.min.css';
import Loading from './components/loading';
import './apis/axios.api';

const rootElement = document.getElementById('root');
const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, router);

ReactDOM.render(
  <React.StrictMode>
    <Provider {...store}>
      <Loading />
      <Router history={history}>
        <SentryError>
          <Routes />
        </SentryError>
      </Router>
    </Provider>
  </React.StrictMode>,
  rootElement
);
// serviceWorker.register();