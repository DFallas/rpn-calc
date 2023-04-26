import './App.css';
import ConsoleStandartIO from './components/ConsoleStandartIO'
import { Container } from "@mui/material"

function App() {

  return (
    <Container disableGutters maxWidth="none"  className="App">
      <header className="App-header">
        <p className='signature'>
        RPN Calc
        </p>
      </header>
      <ConsoleStandartIO />
    </Container>
  );
}

export default App;
