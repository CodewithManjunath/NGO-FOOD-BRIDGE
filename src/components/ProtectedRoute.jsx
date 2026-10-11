import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRole && user.role !== allowedRole) {
    const redirectPath = user.role === 'admin' ? '/admin' : user.role === 'ngo' ? '/ngo' : user.role === 'volunteer' ? '/volunteer' : '/donor'
    return <Navigate to={redirectPath} replace />
  }

  return children
}
