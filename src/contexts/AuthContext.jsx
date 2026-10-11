import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../services/api'

const AuthContext = createContext(null)
const STORAGE_KEY = 'foodbridge-session'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

function mapUser(user) {
  return { ...user, role: user.role === 'donor' ? 'user' : user.role }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)
  const user = session?.user || null

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [session])

  const login = async ({ email, password, accountType = 'donor' }) => {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, accountType }),
    })
    const nextSession = { token: result.token, user: mapUser(result.user) }
    setSession(nextSession)
    return nextSession.user
  }

  const register = async (formData) => {
    const result = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    const nextSession = { token: result.token, user: mapUser(result.user) }
    setSession(nextSession)
    return nextSession.user
  }

  const logout = () => setSession(null)

  const value = useMemo(() => ({ user, token: session?.token || null, login, logout, register }), [session, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
