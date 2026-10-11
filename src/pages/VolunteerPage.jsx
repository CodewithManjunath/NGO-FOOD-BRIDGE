import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiRequest } from '../services/api'

const shiftCategories = ['Food pickup', 'Food sorting', 'Meal support', 'Cleaning']

export default function VolunteerPage() {
  const { user } = useAuth()
  const [shifts, setShifts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [busyShift, setBusyShift] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (location.trim()) params.set('location', location.trim())
    if (query.trim()) params.set('q', query.trim())
    apiRequest(`/shifts?${params.toString()}`)
      .then(setShifts)
      .catch((error) => setErrorMessage(error.message))
  }, [category, location, query])

  const joinShift = async (shift) => {
    setErrorMessage('')
    setBusyShift(shift._id)
    try {
      const updatedShift = await apiRequest(`/volunteer/shifts/${shift._id}/join`, { method: 'POST' })
      setShifts((current) => current.map((item) => item._id === updatedShift._id ? updatedShift : item))
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setBusyShift('')
    }
  }

  const isVolunteer = user?.role === 'volunteer'

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Shifts posted by local NGOs</span>
        <h1>Help rescue and distribute food</h1>
        <p>Search real pickup, sorting, meal-support, and cleaning shifts. Places remaining reflect actual signups.</p>
      </div>

      <div className="filters-row card-panel">
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search shifts or NGOs" aria-label="Search shifts" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by shift type">
          <option value="">All shift types</option>
          {shiftCategories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <input type="search" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Filter by location" aria-label="Filter by location" />
      </div>

      {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
      <div className="card-grid two-column">
        {shifts.map((shift) => {
          const remaining = Math.max(shift.slots - shift.volunteers.length, 0)
          const alreadyJoined = shift.volunteers.some((volunteer) => volunteer._id === user?.id || volunteer === user?.id)
          return (
            <article className="card-panel" key={shift._id}>
              <span className="tag">{shift.category}</span>
              <h2>{shift.title}</h2>
              <p>{shift.description || 'Support this NGO food rescue shift.'}</p>
              <p><strong>NGO:</strong> {shift.ngoName}</p>
              <p><strong>Location:</strong> {shift.location}</p>
              <p><strong>Starts:</strong> {new Date(shift.startsAt).toLocaleString()}</p>
              <p><strong>Open places:</strong> {remaining} of {shift.slots}</p>
              {isVolunteer ? (
                <button className="primary-button" type="button" disabled={remaining === 0 || alreadyJoined || busyShift === shift._id} onClick={() => joinShift(shift)}>
                  {alreadyJoined ? 'Joined' : busyShift === shift._id ? 'Joining…' : remaining === 0 ? 'Full' : 'Join shift'}
                </button>
              ) : (
                <p className="small-note"><Link to="/register">Register as a volunteer</Link> to join a shift.</p>
              )}
            </article>
          )
        })}
        {!errorMessage && shifts.length === 0 && <p className="small-note">No open shifts match these filters. NGOs can publish shifts from their portal.</p>}
      </div>
    </div>
  )
}
