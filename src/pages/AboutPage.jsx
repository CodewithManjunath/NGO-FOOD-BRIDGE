export default function AboutPage() {
  return (
    <div className="container page-section">
      <div className="section-heading centered">
        <span className="eyebrow">Our mission</span>
        <h1>Building trust, dignity, and action for every neighborhood.</h1>
      </div>

      <div className="story-grid">
        <div className="card-panel">
          <h3>Who we are</h3>
          <p>
            CommunityCare brings together residents, volunteers, NGOs, and administrators to solve local challenges with transparency and speed.
          </p>
        </div>

        <div className="card-panel">
          <h3>What we do</h3>
          <p>
            We help communities report issues, coordinate support, manage volunteer action, and oversee progress from the first report to the final resolution.
          </p>
        </div>

        <div className="card-panel">
          <h3>How we work</h3>
          <p>
            We combine local insight, digital tracking, and community collaboration to ensure each initiative remains responsive, accountable, and measurable.
          </p>
        </div>
      </div>

      <div className="values-grid">
        <div className="value-card card-panel">
          <h4>Community First</h4>
          <p>Every action is built around the needs of people on the ground.</p>
        </div>
        <div className="value-card card-panel">
          <h4>Transparent Progress</h4>
          <p>Reports, volunteer work, and impacts are visible to all stakeholders.</p>
        </div>
        <div className="value-card card-panel">
          <h4>Collaborative Action</h4>
          <p>Members, NGOs, and volunteers all work together to deliver real outcomes.</p>
        </div>
      </div>
    </div>
  )
}
