import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BetaLanding } from './pages/BetaLanding/BetaLanding';
import { AboutUs } from './pages/BetaLanding/AboutUs';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AddAssets } from './pages/AddAssets/AddAssets';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BetaLanding />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-assets" element={<AddAssets />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
