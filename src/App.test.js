import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contributors table', () => {
  render(<App />);
  const linkElement = screen.getByText('Organization');
  expect(linkElement).toBeInTheDocument();
});
