import React from 'react';
import { render } from '@testing-library/react';
import Cep from '.';

test('renders learn react link', () => {
  const cep = render(<Cep zipCode={14405191} />);
  expect(cep).toMatchSnapshot();
});
