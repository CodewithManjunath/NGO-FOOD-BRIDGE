import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AICommunityAssistant from './components/AICommunityAssistant'
import { AuthProvider } from './contexts/AuthContext'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AboutPage from './pages/AboutPage'
import Analytics from './admin/Analytics'
import ContactPage from './pages/ContactPage'
import DonatePage from './pages/DonatePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ManageProjects from './admin/ManageProjects'
import ManageReports from './admin/ManageReports'
import ManageUsers from './admin/ManageUsers'
import ManageVolunteers from './admin/ManageVolunteers'
import MyReportsPage from './pages/MyReportsPage'
import MyVolunteerActivitiesPage from './pages/MyVolunteerActivitiesPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import ProjectsPage from './pages/ProjectsPage'
import RegisterPage from './pages/RegisterPage'
import ReportProblemPage from './pages/ReportProblemPage'
import ReportsPage from './pages/ReportsPage'
import UserDashboardPage from './pages/UserDashboardPage'
import VolunteerOpportunitiesPage from './pages/VolunteerOpportunitiesPage'
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
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/dashboard" element={<ProtectedRoute allowedRole="user"><UserDashboardPage /></ProtectedRoute>} />
              <Route path="/dashboard/reports" element={<ProtectedRoute allowedRole="user"><MyReportsPage /></ProtectedRoute>} />
              <Route path="/dashboard/report-problem" element={<ProtectedRoute allowedRole="user"><ReportProblemPage /></ProtectedRoute>} />
              <Route path="/dashboard/volunteer" element={<ProtectedRoute allowedRole="user"><VolunteerOpportunitiesPage /></ProtectedRoute>} />
              <Route path="/dashboard/activities" element={<ProtectedRoute allowedRole="user"><MyVolunteerActivitiesPage /></ProtectedRoute>} />
              <Route path="/dashboard/notifications" element={<ProtectedRoute allowedRole="user"><NotificationsPage /></ProtectedRoute>} />
              <Route path="/dashboard/profile" element={<ProtectedRoute allowedRole="user"><ProfilePage /></ProtectedRoute>} />

              <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><ManageUsers /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute allowedRole="admin"><ManageReports /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute allowedRole="admin"><ManageProjects /></ProtectedRoute>} />
              <Route path="/admin/volunteers" element={<ProtectedRoute allowedRole="admin"><ManageVolunteers /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><Analytics /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <AICommunityAssistant />
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
