import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlassModal from './Components/GlassModal';
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import MyUploads from './Pages/MyUploads';
import MyExchanges from './Pages/MyExchanges';
import MyPoints from './Pages/MyPoints';
import { ModalProvider } from './Contexts/ModalContext';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import './Styles/App.css';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <GlassModal />
          <Navbar />
          <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/my-uploads" element={<ProtectedRoute><MyUploads /></ProtectedRoute>} />
              <Route path="/my-exchanges" element={<ProtectedRoute><MyExchanges /></ProtectedRoute>} />
              <Route path="/my-points" element={<ProtectedRoute><MyPoints /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
