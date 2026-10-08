import { campaigns, donations, projects, reports, users } from '../data/mockData'

export default function AdminDashboardPage() {
  return (
    <div className="container page-section dashboard-page">
      <div className="section-heading">
        <span className="eyebrow">Admin control panel</span>
        <h1>Admin Dashboard</h1>
      </div>

      <div className="stats-grid dashboard-stats">
        <div className="stat-card card-panel"><h3>{users.length}</h3><p>Total Users</p></div>
        <div className="stat-card card-panel"><h3>120</h3><p>Total Volunteers</p></div>
        <div className="stat-card card-panel"><h3>{projects.length}</h3><p>Active Projects</p></div>
        <div className="stat-card card-panel"><h3>{reports.length}</h3><p>Pending Reports</p></div>
        <div className="stat-card card-panel"><h3>34</h3><p>Resolved Problems</p></div>
        <div className="stat-card card-panel"><h3>₹{donations.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN')}</h3><p>Total Donations</p></div>
      </div>

      <div className="two-column-layout dashboard-layout">
        <div className="card-panel">
          <h3>Reports by category</h3>
          <div className="bar-chart">
            <span style={{ height: '45%' }} />
            <span style={{ height: '78%' }} />
            <span style={{ height: '60%' }} />
            <span style={{ height: '90%' }} />
            <span style={{ height: '72%' }} />
          </div>
        </div>

        <div className="card-panel">
          <h3>Donations</h3>
          <ul className="list-stack">
            {donations.map((donation) => (
              <li key={donation.id}>₹{donation.amount.toLocaleString('en-IN')} • {donation.campaign}</li>
            ))}
          </ul>
        </div>

        <div className="card-panel">
          <h3>Campaigns</h3>
          <ul className="list-stack">
            {campaigns.map((campaign) => (
              <li key={campaign.id}>{campaign.name} <span>{campaign.status}</span></li>
            ))}
          </ul>
        </div>

        <div className="card-panel">
          <h3>Project progress</h3>
          <ul className="list-stack progress-stack">
            {projects.map((project) => (
              <li key={project.id}><span>{project.name}</span><strong>{project.progress}%</strong></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
