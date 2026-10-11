export default function AboutPage() {
  return (
    <div className="container page-section">
      <div className="section-heading centered">
        <span className="eyebrow">Our mission</span>
        <h1>Reducing hunger, sharing meals, and restoring dignity in every neighborhood.</h1>
      </div>

      <div className="story-grid">
        <div className="card-panel">
          <h3>Who we are</h3>
          <p>
            FoodBridge connects donors, volunteers, and local communities to make food rescue, meal support, and emergency relief faster and more transparent.
          </p>
        </div>

        <div className="card-panel">
          <h3>What we do</h3>
          <p>
            We organize food drives, distribute meal packs, support emergency food access, and help community kitchens reach families who need nourishing meals most.
          </p>
        </div>

        <div className="card-panel">
          <h3>How we work</h3>
          <p>
            We combine local volunteer efforts, quick donor support, and real-time food request tracking so support reaches families without delays.
          </p>
        </div>
      </div>

      <div className="values-grid">
        <div className="value-card card-panel">
          <h4>Zero Waste</h4>
          <p>We rescue surplus food and redirect it to families who need it most.</p>
        </div>
        <div className="value-card card-panel">
          <h4>Direct Impact</h4>
          <p>Every donation is tracked from meals donated to meals served.</p>
        </div>
        <div className="value-card card-panel">
          <h4>Community Action</h4>
          <p>Volunteers, donors, and local groups work together to create lasting food security.</p>
        </div>
      </div>
    </div>
  )
}
