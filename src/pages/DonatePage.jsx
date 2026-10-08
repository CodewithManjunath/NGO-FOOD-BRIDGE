import { useState } from 'react'

const presetAmounts = [100, 500, 1000, 2000]

export default function DonatePage() {
  const [amount, setAmount] = useState(1000)

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Support the mission</span>
        <h1>Make a donation</h1>
      </div>

      <div className="two-column-layout">
        <div className="card-panel donation-panel">
          <h3>Choose an amount</h3>
          <div className="amount-grid">
            {presetAmounts.map((value) => (
              <button type="button" key={value} className={`amount-button ${amount === value ? 'active' : ''}`} onClick={() => setAmount(value)}>
                ₹{value.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          <label className="field-label">
            Custom Amount
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} min="0" />
          </label>
          <div className="donation-summary">
            <h4>Where your donation goes</h4>
            <ul>
              <li>40% Education</li>
              <li>25% Healthcare</li>
              <li>20% Environment</li>
              <li>15% Community Development</li>
            </ul>
          </div>
        </div>

        <form className="form-panel card-panel">
          <h3>Donation details</h3>
          <div className="form-grid">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Campaign or cause" required />
            <input type="text" placeholder="Cardholder Name" required />
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="Expiry" required />
            <input type="text" placeholder="CVV" required />
          </div>
          <button type="submit" className="primary-button">Donate ₹{Number(amount).toLocaleString('en-IN')}</button>
        </form>
      </div>
    </div>
  )
}
