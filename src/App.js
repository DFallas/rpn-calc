import './App.css';
import ConsoleStandartIO from './components/ConsoleStandartIO'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p className='signature'>
        RVP Calc
        </p>
      </header>
      <div className='column'>
        <div className='row'>
        <ConsoleStandartIO />
        </div>
      </div>
    </div>
  );
}

export default App;
