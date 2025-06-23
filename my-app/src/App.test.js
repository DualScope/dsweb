import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application without crashing', () => {
  render(<App />);
  const element = screen.getByText(/Los Angeles Based Director/i);
  expect(element).toBeInTheDocument();
});
