import * as React from 'react';
import { captureException } from '@sentry/browser';

export class SentryError extends React.Component<{}, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: any) {
    this.setState({ error });
    captureException(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className='snap'>
          <p>Algum erro crítico não esperado aconteceu.</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
