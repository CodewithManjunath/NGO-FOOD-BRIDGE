import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api'

const shiftCategories = ['Food pickup', 'Food sorting', 'Meal support', 'Cleaning']
const emptyForm = { title: '', category: 'Food pickup', description: '', location: '', startsAt: '', slots: '1' }

export default function NGOShiftsPage() {
  const [shifts, setShifts] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    apiRequest('/ngo/shifts')
      .then(setShifts)
      .catch((error) => setErrorMessage(error.message))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      const shift = await apiRequest('/ngo/shifts', { method: 'POST', body: JSON.stringify(formData) })
      setShifts((current) => [shift, ...current])
      setFormData(emptyForm)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">NGO volunteer coordination</span>
        <h1>Publish a volunteer shift</h1>
        <p>Create real pickup, sorting, meal-support, or cleaning shifts. Signups are capped by the available places.</p>
      </div>

      <div className="two-column-layout">
        <form className="form-panel card-panel" onSubmit={handleSubmit}>
          <h2>New shift</h2>
          <div className="form-grid">
            <input value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} placeholder="Shift title" required maxLength={120} />
            <select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} aria-label="Shift type">
              {shiftCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} placeholder="What will volunteers do?" maxLength={1000} rows={3} />
            <input value={formData.location} onChange={(event) => setFormData({ ...formData, location: event.target.value })} placeholder="Pickup or work location" required maxLength={250} />
            <label className="field-label">Shift starts<input type="datetime-local" value={formData.startsAt} onChange={(event) => setFormData({ ...formData, startsAt: event.target.value })} required /></label>
            <label className="field-label">Volunteer places<input type="number" value={formData.slots} onChange={(event) => setFormData({ ...formData, slots: event.target.value })} min="1" max="100" required /></label>
          </div>
          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
          <button type="submit" className="primary-button" disabled={isSubmitting}>{isSubmitting ? 'Publishing…' : 'Publish shift'}</button>
        </form>

        <section aria-labelledby="ngo-shifts-heading">
          <h2 id="ngo-shifts-heading">Your shifts</h2>
          <div className="stack-list">
            {shifts.map((shift) => (
              <article className="card-panel" key={shift._id}>
                <span className="tag">{shift.category}</span>
                <h3>{shift.title}</h3>
                <p>{shift.location} · {new Date(shift.startsAt).toLocaleString()}</p>
                <p><strong>Volunteer signups:</strong> {shift.volunteers.length} / {shift.slots}</p>
                {shift.volunteers.map((volunteer) => <p key={volunteer._id}>{volunteer.name} · {volunteer.email}</p>)}
              </article>
            ))}
            {shifts.length === 0 && <p className="small-note">No shifts have been published by your NGO.</p>}
          </div>
        </section>
      </div>
    </div>
  )
}
