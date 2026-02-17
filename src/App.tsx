import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BetaLanding } from './pages/BetaLanding/BetaLanding';
import { AboutUs } from './pages/BetaLanding/AboutUs';
import { Dashboard } from './pages/Dashboard/Dashboard';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BetaLanding />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
