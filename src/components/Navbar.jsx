import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Problems', to: '/reports' },
  { name: 'Projects', to: '/projects' },
  { name: 'Volunteer', to: '/volunteer' },
  { name: 'Donate', to: '/donate' },
  { name: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <div className="brand-wrap">
          <div className="brand-mark">NGO</div>
          <div>
            <div className="brand-name">CommunityCare</div>
            <div className="brand-tag">Together for action</div>
          </div>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              {item.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink to={user.role === 'admin' ? '/admin' : '/dashboard'} className="nav-link button-link" onClick={() => setIsOpen(false)}>
                {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </NavLink>
              <button type="button" className="logout-button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link button-link" onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="nav-link primary-button" onClick={() => setIsOpen(false)}>Register</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
