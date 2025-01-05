import { Route, Routes } from 'react-router-dom';
import './App.css';

import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Homepage = lazy(() => import('./components/Homepage'));
const Support = lazy(() => import('./components/Support'));
const About = lazy(() => import('./components/About'));

function App() {
  return (
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/support' element={<Support/>} />
          <Route path='/about' element={<About/>} />
          <Route path='*' element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
  );
}

export default App;