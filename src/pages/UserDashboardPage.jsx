import { Link } from 'react-router-dom'
import { notifications, reports, volunteerOpportunities } from '../data/mockData'

export default function UserDashboardPage() {
  return (
    <div className="container page-section dashboard-page">
      <div className="section-heading">
        <span className="eyebrow">Welcome back</span>
        <h1>Welcome, User</h1>
      </div>

      <div className="stats-grid dashboard-stats">
        <div className="stat-card card-panel"><h3>8</h3><p>Reports Submitted</p></div>
        <div className="stat-card card-panel"><h3>5</h3><p>Problems Resolved</p></div>
        <div className="stat-card card-panel"><h3>32</h3><p>Volunteer Hours</p></div>
        <div className="stat-card card-panel"><h3>4</h3><p>Projects Joined</p></div>
      </div>

      <div className="two-column-layout dashboard-layout">
        <div className="card-panel">
          <h3>Recent Reports</h3>
          <ul className="list-stack">
            {reports.slice(0, 3).map((report) => (
              <li key={report.id}>{report.title} <span>{report.status}</span></li>
            ))}
          </ul>
        </div>

        <div className="card-panel">
          <h3>Upcoming Volunteer Activities</h3>
          <ul className="list-stack">
            {volunteerOpportunities.slice(0, 3).map((activity) => (
              <li key={activity.id}>{activity.title} <span>{activity.date}</span></li>
            ))}
          </ul>
        </div>

        <div className="card-panel">
          <h3>Notifications</h3>
          <ul className="list-stack">
            {notifications.slice(0, 3).map((item) => (
              <li key={item.id}>{item.message}</li>
            ))}
          </ul>
        </div>

        <div className="card-panel">
          <h3>Community Impact</h3>
          <div className="mini-chart">
            <span style={{ height: '60%' }} />
            <span style={{ height: '78%' }} />
            <span style={{ height: '82%' }} />
            <span style={{ height: '91%' }} />
            <span style={{ height: '72%' }} />
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/reports" className="secondary-button">My Reports</Link>
        <Link to="/volunteer" className="secondary-button">Volunteer Opportunities</Link>
      </div>
    </div>
  )
}
