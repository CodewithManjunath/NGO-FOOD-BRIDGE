import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import AdminDashboardPage from './pages/AdminDashboardPage'
import DonatePage from './pages/DonatePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NGODashboardPage from './pages/NGODashboardPage'
import NGODirectoryPage from './pages/NGODirectoryPage'
import NGOShiftsPage from './pages/NGOShiftsPage'
import RegisterPage from './pages/RegisterPage'
import DonorDashboardPage from './pages/DonorDashboardPage'
import VolunteerPage from './pages/VolunteerPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/ngos" element={<NGODirectoryPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/donor" element={<ProtectedRoute allowedRole="user"><DonorDashboardPage /></ProtectedRoute>} />
              <Route path="/ngo" element={<ProtectedRoute allowedRole="ngo"><NGODashboardPage /></ProtectedRoute>} />
              <Route path="/ngo/shifts" element={<ProtectedRoute allowedRole="ngo"><NGOShiftsPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin-platform" element={<ProtectedRoute allowedRole="admin"><AdminDashboardPage /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
