import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '' })
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    register(formData)
    navigate('/dashboard')
  }

  return (
    <div className="container page-section auth-page">
      <form className="form-panel card-panel auth-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-grid">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        </div>
        <button type="submit" className="primary-button">Create Account</button>
      </form>
    </div>
  )
}
