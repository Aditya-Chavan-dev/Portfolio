import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { HubPage } from './pages/HubPage';
import { EasterEggWrapper } from './components/EasterEggWrapper';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPanel from './pages/AdminPanel';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="min-h-screen bg-obsidian text-white font-body selection:bg-gold/30 selection:text-gold">
      <EasterEggWrapper>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/hub" element={<HubPage />} />
          
          {/* Covert Login Route */}
          <Route path="/amgl-3-10" element={<AdminLoginPage />} />
          
          {/* Protected Admin Route */}
          <Route 
            path="/amgl-panel" 
            element={
              <RequireAuth>
                <AdminPanel />
              </RequireAuth>
            } 
          />
        </Routes>
      </EasterEggWrapper>
    </div>
  );
}

export default App;
