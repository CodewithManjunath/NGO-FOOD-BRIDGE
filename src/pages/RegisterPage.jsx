import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiRequest } from '../services/api'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    donorKind: 'Household',
    organizationName: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [accountType, setAccountType] = useState('donor')
  const [ngos, setNgos] = useState([])
  const [ngoId, setNgoId] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  useEffect(() => {
    apiRequest('/ngos')
      .then((recipients) => {
        setNgos(recipients)
        setNgoId(recipients[0]?.id || '')
      })
      .catch((error) => setErrorMessage(error.message))
  }, [])

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)
    try {
      const user = await register({ ...formData, accountType, ngoId, invitationCode })
      navigate(user.role === 'ngo' ? '/ngo' : user.role === 'volunteer' ? '/volunteer' : '/donor')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container page-section auth-page">
      <form className="form-panel card-panel auth-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-grid">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <select aria-label="Account type" value={accountType} onChange={(event) => setAccountType(event.target.value)}>
            <option value="donor">Food donor</option>
            <option value="ngo">NGO member</option>
            <option value="volunteer">Volunteer</option>
          </select>
          {accountType === 'donor' ? (
            <>
              <select name="donorKind" value={formData.donorKind} onChange={handleChange} aria-label="Donor type">
                <option>Household</option>
                <option>Individual</option>
                <option>Hotel</option>
                <option>Restaurant</option>
                <option>Anna / Charitable Trust</option>
                <option>Grocery Store</option>
                <option>Community Group</option>
                <option>Other Organization</option>
              </select>
              {!['Household', 'Individual'].includes(formData.donorKind) && (
                <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Organization name" required />
              )}
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
            </>
          ) : accountType === 'ngo' ? (
            <>
              <select aria-label="NGO" value={ngoId} onChange={(event) => setNgoId(event.target.value)} required>
                {ngos.map((ngo) => <option key={ngo.id} value={ngo.id}>{ngo.name} · {ngo.location}</option>)}
              </select>
              <input type="password" value={invitationCode} onChange={(event) => setInvitationCode(event.target.value)} placeholder="NGO member invitation code" required />
            </>
          ) : (
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Your location" required />
          )}
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password (at least 8 characters)" minLength={8} required />
        </div>
        {accountType === 'ngo' && ngos.length === 0 && <p className="small-note">NGO membership requires configured recipient organizations and an invitation code.</p>}
        {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        <button type="submit" className="primary-button" disabled={isSubmitting || (accountType === 'ngo' && ngos.length === 0)}>{isSubmitting ? 'Creating account…' : 'Create Account'}</button>
      </form>
    </div>
  )
}
