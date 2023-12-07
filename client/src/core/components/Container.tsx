import { Routes,Route } from 'react-router-dom';
import Home from '../../pages';

const Container = () => {
  return (
    <main className='mx-auto min-h-screen'>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </main>
  )
}

export default Container