import { volunteerOpportunities } from '../data/mockData'

export default function VolunteerOpportunitiesPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Opportunities</span>
        <h1>Volunteer Opportunities</h1>
      </div>

      <div className="card-grid three-column">
        {volunteerOpportunities.map((item) => (
          <article key={item.id} className="volunteer-card card-panel">
            <div className="card-content">
              <span className="tag">{item.category}</span>
              <h3>{item.title}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Volunteers Needed:</strong> {item.volunteersNeeded}</p>
              <p><strong>Registered:</strong> {item.registered}</p>
              <button type="button" className="primary-button inline-button">Join Now</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
