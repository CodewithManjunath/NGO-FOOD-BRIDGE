import { useState } from 'react'
import { volunteerOpportunities } from '../data/mockData'

export default function VolunteerPage() {
  const [registered, setRegistered] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setRegistered(true)
  }

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Join the movement</span>
        <h1>Become a volunteer</h1>
      </div>

      <div className="two-column-layout">
        <form className="form-panel card-panel" onSubmit={handleSubmit}>
          <h3>Volunteer Registration</h3>
          <div className="form-grid">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone" required />
            <input type="text" placeholder="Location" required />
            <input type="text" placeholder="Skills" required />
            <input type="text" placeholder="Availability" required />
            <textarea placeholder="Areas of Interest" rows="3" required />
            <textarea placeholder="Experience" rows="3" required />
          </div>
          <button type="submit" className="primary-button">Submit</button>
          {registered && <p className="success-message">Welcome to the Community Volunteer Network.</p>}
        </form>

        <div className="list-panel card-panel">
          <h3>Volunteer Opportunities</h3>
          <div className="stack-list">
            {volunteerOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="opportunity-item">
                <h4>{opportunity.title}</h4>
                <p>Location: {opportunity.location}</p>
                <p>Date: {opportunity.date}</p>
                <p>Volunteers Needed: {opportunity.volunteersNeeded}</p>
                <p>Registered: {opportunity.registered}</p>
                <button type="button" className="secondary-button inline-button">Join Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
