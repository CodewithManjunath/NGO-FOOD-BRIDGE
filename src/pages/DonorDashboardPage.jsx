import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiRequest } from '../services/api'

export default function DonorDashboardPage() {
  const { user } = useAuth()
  const donorIdentity = user?.organizationName || user?.name
  const [recentDonations, setRecentDonations] = useState([])
  const [donationsError, setDonationsError] = useState('')

  useEffect(() => {
    apiRequest('/donations/mine')
      .then(setRecentDonations)
      .catch((error) => setDonationsError(error.message))
  }, [])
  const donationStats = [
    { label: 'Donation offers', value: recentDonations.length },
    { label: 'Awaiting NGO response', value: recentDonations.filter((donation) => donation.status === 'Awaiting NGO confirmation').length },
    { label: 'Accepted by NGOs', value: recentDonations.filter((donation) => donation.status === 'Accepted').length },
    { label: 'Money pledges', value: recentDonations.filter((donation) => donation.donationType === 'money').length },
  ]

  return (
    <div className="container page-section dashboard-page">
      <div className="section-heading">
        <span className="eyebrow">Donor platform</span>
        <h1>Donor Dashboard</h1>
        <p className="small-note">{user?.donorKind || 'Donor'} account: {donorIdentity}</p>
      </div>

      <div className="stats-grid dashboard-stats">
        {donationStats.map((item) => (
          <div key={item.label} className="stat-card card-panel">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="two-column-layout dashboard-layout">
        <div className="card-panel">
          <h3>Recent Donations</h3>
          <ul className="list-stack">
            {recentDonations.map((donation) => (
              <li key={donation._id}>
                <strong>{donation.donationType === 'food' ? `${donation.quantity} ${donation.unit} ${donation.foodCategory}` : `₹${Number(donation.amount).toLocaleString('en-IN')} pledge`}</strong>
                <span>{donation.recipientNgoName}</span>
                <small>{donation.status}</small>
              </li>
            ))}
            {donationsError && <li>{donationsError}</li>}
            {!donationsError && recentDonations.length === 0 && <li>No donation requests yet.</li>}
          </ul>
          <Link to="/donate" className="primary-button inline-button">Offer food or money</Link>
        </div>
      </div>
    </div>
  )
}
