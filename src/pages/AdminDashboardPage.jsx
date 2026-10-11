import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api'

export default function AdminDashboardPage() {
  const [donations, setDonations] = useState([])
  const [ngos, setNgos] = useState([])
  const [ngoForm, setNgoForm] = useState({ name: '', location: '', description: '' })
  const [invitation, setInvitation] = useState(null)
  const [isCreatingNgo, setIsCreatingNgo] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    Promise.all([apiRequest('/admin/donations'), apiRequest('/admin/ngos')])
      .then(([donationRecords, ngoRecords]) => {
        setDonations(donationRecords)
        setNgos(ngoRecords)
      })
      .catch((error) => setErrorMessage(error.message))
  }, [])

  const pendingDonations = donations.filter((donation) => donation.status === 'Awaiting NGO confirmation')
  const acceptedDonations = donations.filter((donation) => donation.status === 'Accepted')
  const moneyPledges = donations.filter((donation) => donation.donationType === 'money')
  const pledgedAmount = moneyPledges.reduce((total, donation) => total + donation.amount, 0)

  const createNgo = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsCreatingNgo(true)
    try {
      const result = await apiRequest('/admin/ngos', { method: 'POST', body: JSON.stringify(ngoForm) })
      setNgos((current) => [...current, result.ngo].sort((left, right) => left.name.localeCompare(right.name)))
      setInvitation({ ngoId: result.ngo.id, code: result.invitationCode })
      setNgoForm({ name: '', location: '', description: '' })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsCreatingNgo(false)
    }
  }

  const rotateInvite = async (ngo) => {
    setErrorMessage('')
    try {
      const result = await apiRequest(`/admin/ngos/${ngo.id}/invitation-code`, { method: 'POST' })
      setInvitation({ ngoId: ngo.id, code: result.invitationCode })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="container page-section dashboard-page">
      <div className="section-heading">
        <span className="eyebrow">Food rescue operations</span>
        <h1>Donation oversight</h1>
      </div>

      <div className="stats-grid dashboard-stats">
        <div className="stat-card card-panel"><h3>{donations.length}</h3><p>Total offers</p></div>
        <div className="stat-card card-panel"><h3>{pendingDonations.length}</h3><p>Awaiting NGO response</p></div>
        <div className="stat-card card-panel"><h3>{acceptedDonations.length}</h3><p>Accepted by NGOs</p></div>
        <div className="stat-card card-panel"><h3>₹{pledgedAmount.toLocaleString('en-IN')}</h3><p>Money pledged</p></div>
      </div>

      {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
      <div className="two-column-layout dashboard-layout">
        <form className="form-panel card-panel" onSubmit={createNgo}>
          <h2>Onboard a verified NGO</h2>
          <div className="form-grid">
            <input value={ngoForm.name} onChange={(event) => setNgoForm({ ...ngoForm, name: event.target.value })} placeholder="Official NGO name" maxLength={160} required />
            <input value={ngoForm.location} onChange={(event) => setNgoForm({ ...ngoForm, location: event.target.value })} placeholder="Service location" maxLength={160} required />
            <textarea value={ngoForm.description} onChange={(event) => setNgoForm({ ...ngoForm, description: event.target.value })} placeholder="Food support offered" maxLength={500} rows={3} />
          </div>
          <button type="submit" className="primary-button" disabled={isCreatingNgo}>{isCreatingNgo ? 'Adding NGO…' : 'Add NGO'}</button>
          {invitation && <p className="success-message" role="status">One-time member invite for {ngos.find((ngo) => ngo.id === invitation.ngoId)?.name}: <strong>{invitation.code}</strong>. Share it privately; it cannot be retrieved later.</p>}
        </form>

        <section>
          <h2>NGO partners ({ngos.length})</h2>
          <div className="stack-list">
            {ngos.map((ngo) => (
              <article className="card-panel" key={ngo.id}>
                <h3>{ngo.name}</h3>
                <p>{ngo.location}{ngo.description ? ` · ${ngo.description}` : ''}</p>
                <button type="button" className="secondary-button" onClick={() => rotateInvite(ngo)}>Generate new invite</button>
              </article>
            ))}
            {ngos.length === 0 && <p className="small-note">No NGOs onboarded yet. Add verified partner organizations here.</p>}
          </div>
        </section>
      </div>

      <div className="stack-list">
        {donations.map((donation) => (
          <article className="card-panel" key={donation._id}>
            <div className="meta-row"><span className="tag">{donation.donorType}</span><span>{donation.status}</span></div>
            <h3>{donation.donationType === 'food' ? `${donation.quantity} ${donation.unit} ${donation.foodCategory}` : `₹${Number(donation.amount).toLocaleString('en-IN')} money pledge`}</h3>
            <p><strong>Donor:</strong> {donation.donorName} · {donation.donorEmail}</p>
            <p><strong>Recipient NGO:</strong> {donation.recipientNgoName}</p>
            {donation.donationType === 'food' && <p><strong>Pickup:</strong> {donation.pickupLocation} · {new Date(donation.pickupTime).toLocaleString()}</p>}
          </article>
        ))}
        {!errorMessage && donations.length === 0 && <p className="small-note">No donation requests have been recorded yet.</p>}
      </div>
    </div>
  )
}
