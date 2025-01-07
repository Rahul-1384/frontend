import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const Sell = lazy(() => import("./pages/Sell"));

function App() {
  return (
      <Suspense fallback={<Loading/>}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sell" element={<Sell/>} />
        </Routes>
      </Suspense>
  );
}

export default App;