import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
const Homepage = lazy(() => import('./components/Homepage'));
const Sell = lazy(() => import('./components/Sell'));

function App() {
  return (
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/sell' element={<Sell/>} />
        </Routes>
      </Suspense>
  );
}

export default App;