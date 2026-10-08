import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'ngo-community-auth-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const isAdmin = normalizedEmail.includes('admin') || password === 'admin123'

    const account = {
      id: isAdmin ? 'admin1' : 'u1',
      name: isAdmin ? 'Admin User' : 'Aisha Kumar',
      email: normalizedEmail,
      role: isAdmin ? 'admin' : 'user',
      location: isAdmin ? 'Head Office' : 'Bangalore',
    }

    setUser(account)
    return account
  }

  const register = (formData) => {
    const createdUser = {
      id: `u-${Date.now()}`,
      name: formData.name,
      email: formData.email.trim().toLowerCase(),
      role: 'user',
      location: formData.location,
    }

    setUser(createdUser)
    return createdUser
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout, register }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
