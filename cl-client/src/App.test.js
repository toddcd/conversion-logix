import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('conversion-logix', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Please wait while we look up your country. Thanks!/i);
  expect(linkElement).toBeInTheDocument();
});
