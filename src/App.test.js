import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/> Welcome to web console type help for available commands/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders help message', () => {
//   render(<App />);
//   fireEvent.onKeyUp(screen.getByText('Load Greeting'))
//   const linkElement = screen.getByText(/> Welcome to web console type help for available commands/i);
//   expect(linkElement).toBeInTheDocument();
// });
