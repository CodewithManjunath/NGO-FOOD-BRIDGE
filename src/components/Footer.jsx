import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>FoodBridge</h3>
          <p>Connecting households, restaurants, and hotels with NGOs to rescue surplus food and reduce waste.</p>
        </div>

        <div>
          <h4>Food rescue</h4>
          <div className="footer-links">
            <Link to="/donate">Offer food or money</Link>
            <Link to="/ngos">Find an NGO</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/register">Join as donor or NGO</Link>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">FoodBridge · Food rescue network</div>
      </div>
    </footer>
  )
}
