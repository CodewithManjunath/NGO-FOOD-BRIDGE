import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../services/api'

export default function NGODirectoryPage() {
  const [ngos, setNgos] = useState([])
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    apiRequest('/ngos')
      .then(setNgos)
      .catch((error) => setErrorMessage(error.message))
  }, [])

  const normalizedSearch = search.trim().toLowerCase()
  const visibleNgos = ngos.filter((ngo) =>
    `${ngo.name} ${ngo.location} ${ngo.description}`.toLowerCase().includes(normalizedSearch),
  )

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Verified recipient organizations</span>
        <h1>Find an NGO to support</h1>
        <p>Search active recipient organizations and direct your food or money donation to one of them.</p>
      </div>

      <div className="filters-row card-panel">
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search NGO or location" aria-label="Search NGOs by name or location" />
      </div>
      {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
      <div className="card-grid three-column">
        {visibleNgos.map((ngo) => (
          <article key={ngo.id} className="card-panel">
            <span className="tag">{ngo.location}</span>
            <h2>{ngo.name}</h2>
            <p>{ngo.description || 'Food rescue recipient organization.'}</p>
            <Link to={`/donate?ngo=${encodeURIComponent(ngo.id)}`} className="primary-button inline-button">Donate to this NGO</Link>
          </article>
        ))}
        {!errorMessage && ngos.length === 0 && <p className="small-note">No active NGOs are available yet.</p>}
        {!errorMessage && ngos.length > 0 && visibleNgos.length === 0 && <p className="small-note">No NGOs match that search.</p>}
      </div>
    </div>
  )
}
