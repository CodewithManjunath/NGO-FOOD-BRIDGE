import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="page-section">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">SDG 2: Zero Hunger · SDG 12: Responsible Consumption</span>
            <h1>Good food should feed people, not go to waste.</h1>
            <p>
              FoodBridge connects households, restaurants, and hotels with local NGOs to safely redirect surplus food to communities that need it.
            </p>
            <div className="hero-actions">
              <Link to="/ngos" className="primary-button">Find an NGO</Link>
              <Link to="/donate" className="secondary-button">Offer Food or Money</Link>
              <Link to="/volunteer" className="ghost-button">Find a Volunteer Shift</Link>
            </div>
          </div>

          <div className="hero-visual card-panel">
            <div className="mini-card success-card">
              <strong>Donor</strong>
              <span>Offer safe surplus food</span>
            </div>
            <div className="mini-card info-card">
              <strong>NGO</strong>
              <span>Accept or decline requests</span>
            </div>
            <div className="mini-card warning-card">
              <strong>Volunteer</strong>
              <span>Join available rescue shifts</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <span className="eyebrow">One focused network</span>
          <h2>From surplus to accepted donation</h2>
        </div>
        <div className="card-grid two-column">
          <article className="card-panel">
            <h3>For food donors</h3>
            <p>Households, restaurants, and hotels list safe surplus food or record a money pledge for a selected NGO.</p>
            <Link to="/register" className="text-link">Create a donor account</Link>
          </article>
          <article className="card-panel">
            <h3>For NGO members</h3>
            <p>Invited members review offers addressed to their NGO and accept or decline each donation.</p>
            <Link to="/register" className="text-link">Join an NGO inbox</Link>
          </article>
        </div>
      </section>
    </div>
  )
}
