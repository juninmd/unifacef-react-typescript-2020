import { configureScope, init } from '@sentry/browser';
(() => {

  // Desativa o plugin em localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return;
  }

  const { REACT_APP_SENTRY_DSN, REACT_APP_VERSION, REACT_APP_NODE_ENV } = process.env;
  if (!REACT_APP_SENTRY_DSN) {
    return;
  }

  init({ dsn: REACT_APP_SENTRY_DSN, release: REACT_APP_VERSION, environment: REACT_APP_NODE_ENV });
  configureScope(scope => {
  });

})();