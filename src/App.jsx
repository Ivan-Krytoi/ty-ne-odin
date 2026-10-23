import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SosBlock from './components/SosBlock';
import Home from './pages/Home';
import PsychSupport from './pages/PsychSupport';
import FirstAid from './pages/FirstAid';
import Donorship from './pages/Donorship';
import Faq from './pages/Faq';

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/psych" element={<PsychSupport />} />
          <Route path="/first-aid" element={<FirstAid />} />
          <Route path="/donor" element={<Donorship />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {/* SOS-блок виден на каждой странице — прямо перед подволом */}
      <SosBlock />
      <Footer />
    </HashRouter>
  );
}
