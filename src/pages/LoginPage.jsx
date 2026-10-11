import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [accountType, setAccountType] = useState('donor')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)
    try {
      const user = await login({ ...formData, accountType })
      navigate(user.role === 'admin' ? '/admin' : user.role === 'ngo' ? '/ngo' : user.role === 'volunteer' ? '/volunteer' : '/donor')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container page-section auth-page">
      <form className="form-panel card-panel auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label className="role-select-label" htmlFor="account-type">Continue as</label>
        <select
          id="account-type"
          className="role-select"
          value={accountType}
          onChange={(event) => setAccountType(event.target.value)}
        >
          <option value="donor">Donor</option>
          <option value="ngo">NGO member</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Administrator</option>
        </select>
        <div className="form-grid">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <p className="small-note">Administrator accounts must be provisioned by the server administrator.</p>
        {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        <button type="submit" className="primary-button" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Login'}</button>
      </form>
    </div>
  )
}
