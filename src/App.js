import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));

function App() {
  return (
      <Suspense fallback={<Loading/>}>
        <Navbar/>
        <Hero/>
      </Suspense>
  );
}

export default App;