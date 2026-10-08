import { volunteerOpportunities } from '../data/mockData'

export default function ManageVolunteers() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Volunteer coordination</span>
        <h1>Manage Volunteers</h1>
      </div>

      <div className="card-grid three-column">
        {volunteerOpportunities.map((volunteer) => (
          <div key={volunteer.id} className="card-panel opportunity-item admin-item">
            <h3>{volunteer.title}</h3>
            <p>{volunteer.location}</p>
            <p>{volunteer.date}</p>
            <p>Needed: {volunteer.volunteersNeeded}</p>
            <p>Registered: {volunteer.registered}</p>
            <button type="button" className="secondary-button small-button">Assign</button>
          </div>
        ))}
      </div>
    </div>
  )
}
