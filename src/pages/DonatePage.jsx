import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiRequest } from '../services/api'

const presetAmounts = [100, 500, 1000, 2000]

export default function DonatePage() {
  const [amount, setAmount] = useState(1000)
  const [donationType, setDonationType] = useState('food')
  const [submitted, setSubmitted] = useState(false)
  const [ngoRecipients, setNgoRecipients] = useState([])
  const [selectedNgo, setSelectedNgo] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const canDonate = user?.role === 'user'

  useEffect(() => {
    apiRequest('/ngos')
      .then((recipients) => {
        setNgoRecipients(recipients)
        const requestedNgo = searchParams.get('ngo')
        setSelectedNgo(recipients.find((recipient) => recipient.id === requestedNgo)?.id || recipients[0]?.id || '')
      })
      .catch((error) => setErrorMessage(error.message))
  }, [searchParams])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const request = {
      donorName: formData.get('donorName'),
      donorEmail: formData.get('donorEmail'),
      donorType: formData.get('donorType'),
      donationType,
      recipientNgo: formData.get('recipientNgo'),
      ...(donationType === 'food'
        ? {
            foodCategory: formData.get('foodCategory'),
            quantity: formData.get('quantity'),
            unit: formData.get('unit'),
            pickupLocation: formData.get('pickupLocation'),
            pickupTime: formData.get('pickupTime'),
          }
        : { amount }),
    }

    setErrorMessage('')
    setIsSubmitting(true)
    try {
      await apiRequest('/donations', {
        method: 'POST',
        body: JSON.stringify(request),
      })
      setSubmitted(true)
      formElement.reset()
    } catch (error) {
      setSubmitted(false)
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Reduce waste. Feed communities.</span>
        <h1>Offer a food or money donation</h1>
        <p>Choose a local NGO recipient. Food donations are recorded as requests for pickup coordination.</p>
      </div>

      <div className="two-column-layout">
        <div className="card-panel donation-panel">
          <h3>From surplus to shared meals</h3>
          <p>Households can share pantry goods, while restaurants and hotels can offer safe surplus meals before they go to waste.</p>
          <p><strong>Food safety first:</strong> only list food that has been handled and stored safely. The receiving NGO should confirm acceptance before pickup.</p>
          <p className="small-note">SDG 2: Zero Hunger · SDG 12: Responsible Consumption and Production</p>
        </div>

        <form className="form-panel card-panel" onSubmit={handleSubmit}>
          <h3>Start a donation request</h3>
          <label className="field-label" htmlFor="donation-type">Donation type</label>
          <select id="donation-type" value={donationType} onChange={(event) => { setDonationType(event.target.value); setSubmitted(false) }}>
            <option value="food">Surplus food</option>
            <option value="money">Money pledge</option>
          </select>
          <div className="form-grid">
            <input type="text" name="donorName" value={user?.organizationName || user?.name || ''} placeholder="Household or organization name" readOnly required />
            <input type="email" name="donorEmail" value={user?.email || ''} placeholder="Contact email" readOnly required />
            <select name="donorType" defaultValue={user?.donorKind || 'Household'} aria-label="Donor source">
              <option>Household</option>
              <option>Individual</option>
              <option>Restaurant</option>
              <option>Hotel</option>
              <option>Grocery Store</option>
              <option>Anna / Charitable Trust</option>
              <option>Community Group</option>
              <option>Other Organization</option>
            </select>
            <select name="recipientNgo" value={selectedNgo} onChange={(event) => setSelectedNgo(event.target.value)} aria-label="Recipient NGO" required>
              {ngoRecipients.length === 0 && <option value="">No NGOs available</option>}
              {ngoRecipients.map((recipient) => <option key={recipient.id} value={recipient.id}>{recipient.name}</option>)}
            </select>
            {donationType === 'food' ? (
              <>
                <select name="foodCategory" aria-label="Food category" required>
                  <option value="">Select food category</option>
                  <option>Cooked meals</option>
                  <option>Packaged groceries</option>
                  <option>Unprepared produce</option>
                  <option>Bakery items</option>
                  <option>Dairy products</option>
                </select>
                <input type="number" name="quantity" placeholder="Quantity" min="1" required />
                <select name="unit" aria-label="Quantity unit">
                  <option>kg</option>
                  <option>servings</option>
                  <option>crates</option>
                  <option>packs</option>
                </select>
                <input type="text" name="pickupLocation" placeholder="Pickup address" required />
                <input type="datetime-local" name="pickupTime" aria-label="Ready for pickup" required />
              </>
            ) : (
              <>
                <label className="field-label" htmlFor="money-amount">Pledge amount (INR)</label>
                <input id="money-amount" type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value) || 0)} min="1" required />
                <div className="amount-grid">
                  {presetAmounts.map((value) => (
                    <button type="button" key={value} className={`amount-button ${amount === value ? 'active' : ''}`} onClick={() => setAmount(value)}>
                      ₹{value.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {!canDonate && <p className="small-note">Sign in with a donor account to submit a food offer or money pledge. <Link to="/login">Donor sign in</Link></p>}
          <button type="submit" className="primary-button" disabled={!canDonate || isSubmitting || ngoRecipients.length === 0}>
            {isSubmitting ? 'Saving…' : donationType === 'food' ? 'Send Food Request' : `Record ₹${amount.toLocaleString('en-IN')} Pledge`}
          </button>
          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
          {submitted && <p className="success-message" role="status">Donation request saved to the database. The selected NGO can coordinate next steps.</p>}
        </form>
      </div>
    </div>
  )
}
