import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import AuthenticationUser from './Pages/AuthenticationUser';
const Homepage = lazy(() => import('./Pages/Homepage'));
const Sell = lazy(() => import('./Pages/Sell'));

function App() {
  return (
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/sell' element={<Sell/>} />
          <Route path='/signup' element={<AuthenticationUser/>} />
        </Routes>
      </Suspense>
  );
}

export default App;