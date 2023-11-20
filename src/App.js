
import { ThemeProvider } from 'react-bootstrap';
import './App.css';
import Countries from './components/Countries';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
          <h1 className='text-warning'>Countries Data</h1>
          <Countries/>
      </ThemeProvider>
    </div>
  );
}

export default App;
