import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./code-by-csspicker', () => {
  const React = require('react');
  const { SITE } = require('./siteConfig');
  return function MockHome() {
    return React.createElement('footer', null, React.createElement('p', null, SITE.tagline));
  };
});

test('renders the application without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Portugal Based Director/i)).toBeInTheDocument();
});
