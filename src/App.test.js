import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to web console/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders help message when help command is executed', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'help'}, keyCode:13})
  
  const linkElement = screen.getByText(/clear : clear up console/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders calc message when calc command is executed', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  
  const linkElement = screen.getByText(/... Starting NPN Calculator/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders calc exit message when q command is executed', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'q'}, keyCode:13})
  const linkElement = screen.getByText(/... Exiting RPN Calc/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders calc help message when help command is executed on calc', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'help'}, keyCode:13})
  const linkElement = screen.getByText(/valid operants/i);
  expect(linkElement).toBeInTheDocument();
});

test('executes single input operation', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '-3'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '-2'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '*'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '5'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '+'}, keyCode:13})

  const linkElement = screen.getByText(/11/i);
  expect(linkElement).toBeInTheDocument();
});

test('executes single input operation with float numbers', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '5'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '9'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '1'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '-'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '/'}, keyCode:13})

  const linkElement = screen.getByText(/0.625/i);
  expect(linkElement).toBeInTheDocument();
});

test('executes multiple operation input', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '5 5 5 8 + + -'}, keyCode:13})
  const linkElement = screen.getByText(/13/i);
  expect(linkElement).toBeInTheDocument();
});

test('executes multiple operation combined with single input', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '5 5 5 8 + + -'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '13 +'}, keyCode:13})
  const linkElement = screen.getByText(/0/i);
  expect(linkElement).toBeInTheDocument();
});

test('show error for invalid input on calc', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'a'}, keyCode:13})

  const linkElement = screen.getByText(/Invalid Operant/i);
  expect(linkElement).toBeInTheDocument();
});

test('show error for invalid operation on calc', () => {
  render(<App />);
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: 'calc'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '8'}, keyCode:13})
  fireEvent.keyUp(screen.getByRole('textbox'), {target: {value: '*'}, keyCode:13})

  const linkElement = screen.getByText(/unprocesable entity/i);
  expect(linkElement).toBeInTheDocument();
});
