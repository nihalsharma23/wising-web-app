import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BetaLanding } from './pages/BetaLanding/BetaLanding';
import { AboutUs } from './pages/BetaLanding/AboutUs';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BetaLanding />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
