import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>CommunityCare</h3>
          <p>Building resilient communities through volunteer action, civic participation, and transparent solutions.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4>Follow Us</h4>
          <div className="footer-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">© 2026 Community NGO Platform</div>
      </div>
    </footer>
  )
}
