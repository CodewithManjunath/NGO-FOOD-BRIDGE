import { defaultProfile } from '../data/mockData'

export default function ProfilePage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Profile</span>
        <h1>My Profile</h1>
      </div>

      <div className="card-panel profile-panel">
        <div className="profile-avatar">AK</div>
        <div className="profile-info">
          <h3>{defaultProfile.name}</h3>
          <p>{defaultProfile.email}</p>
          <p>{defaultProfile.phone}</p>
          <p>{defaultProfile.location}</p>
          <p><strong>Skills:</strong> {defaultProfile.skills}</p>
          <p><strong>Availability:</strong> {defaultProfile.availability}</p>
        </div>
      </div>
    </div>
  )
}
