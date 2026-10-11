import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiRequest } from '../services/api'

export default function NGODashboardPage() {
  const { user } = useAuth()
  const [donations, setDonations] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [busyDonation, setBusyDonation] = useState('')

  useEffect(() => {
    apiRequest('/ngo/donations')
      .then(setDonations)
      .catch((error) => setErrorMessage(error.message))
  }, [])

  const updateStatus = async (donation, status) => {
    setErrorMessage('')
    setBusyDonation(donation._id)
    try {
      const updatedDonation = await apiRequest(`/ngo/donations/${donation._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setDonations((current) => current.map((item) => item._id === updatedDonation._id ? updatedDonation : item))
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setBusyDonation('')
    }
  }

  return (
    <div className="container page-section dashboard-page">
      <div className="section-heading">
        <span className="eyebrow">NGO member inbox</span>
        <h1>{user?.ngoName || 'NGO Donations'}</h1>
        <p>Review food rescue offers and confirm which donations your team can accept.</p>
        <Link to="/ngo/shifts" className="secondary-button">Manage volunteer shifts</Link>
      </div>

      {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
      <div className="stack-list">
        {donations.map((donation) => (
          <article className="card-panel" key={donation._id}>
            <div className="meta-row">
              <span className="tag">{donation.donorType}</span>
              <span>{donation.status}</span>
            </div>
            <h3>{donation.donationType === 'food' ? donation.foodCategory : `Money pledge: ₹${Number(donation.amount).toLocaleString('en-IN')}`}</h3>
            <p><strong>Donor:</strong> {donation.donorName}</p>
            {donation.donationType === 'food' && (
              <>
                <p><strong>Quantity:</strong> {donation.quantity} {donation.unit}</p>
                <p><strong>Pickup:</strong> {donation.pickupLocation}</p>
                <p><strong>Ready:</strong> {new Date(donation.pickupTime).toLocaleString()}</p>
              </>
            )}
            <p><strong>Contact:</strong> {donation.donorEmail}</p>
            {donation.status === 'Awaiting NGO confirmation' && (
              <div className="admin-actions">
                <button className="primary-button" type="button" disabled={busyDonation === donation._id} onClick={() => updateStatus(donation, 'Accepted')}>
                  {busyDonation === donation._id ? 'Updating…' : 'Accept donation'}
                </button>
                <button className="secondary-button" type="button" disabled={busyDonation === donation._id} onClick={() => updateStatus(donation, 'Declined')}>
                  Decline
                </button>
              </div>
            )}
          </article>
        ))}
        {!errorMessage && donations.length === 0 && <p className="small-note">No donations have been assigned to this NGO yet.</p>}
      </div>
    </div>
  )
}
