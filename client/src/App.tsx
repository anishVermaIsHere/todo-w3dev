import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './core/components/header/Header';
import Container from './core/components/Container';

function App() {
  return (
    <>
    <Router>
      <div className='layout'>
        <Header />
        <Container />
        <footer>
          <div className='py-4 px-2 flex justify-center text-gray-600'>Designed by Anish Verma</div>
        </footer>
      </div>
    </Router>
    </>
    
  )
}

export default App
