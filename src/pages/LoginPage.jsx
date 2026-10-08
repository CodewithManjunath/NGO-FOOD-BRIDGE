import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = login(formData)
    if (user.role === 'admin') {
      navigate('/admin')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="container page-section auth-page">
      <form className="form-panel card-panel auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-grid">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <button type="submit" className="primary-button">Login</button>
        <p className="small-note">Demo admin: admin@ngo.org / admin123</p>
      </form>
    </div>
  )
}
