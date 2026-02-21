import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BetaLanding } from './pages/BetaLanding/BetaLanding';
import { AboutUs } from './pages/BetaLanding/AboutUs';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AddAssets } from './pages/AddAssets/AddAssets';
import { AIChat } from './components/AIChat/AIChat';
import { HamburgerNav } from './components/HamburgerNav/HamburgerNav';

/** Renders the hamburger nav on all pages except the main landing page. */
function GlobalNav() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <HamburgerNav />;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AIChat />
        <GlobalNav />
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
