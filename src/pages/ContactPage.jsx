export default function ContactPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Stay connected</span>
        <h1>Contact us</h1>
      </div>

      <div className="two-column-layout">
        <div className="card-panel contact-card">
          <h3>Get in touch</h3>
          <p><strong>Email:</strong> hello@communitycare.org</p>
          <p><strong>Phone:</strong> +91 80 4388 2044</p>
          <p><strong>Address:</strong> 28 Civic Lane, Bengaluru, India</p>
        </div>

        <form className="form-panel card-panel">
          <h3>Send a message</h3>
          <div className="form-grid">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" required />
            <textarea rows="5" placeholder="How can we help?" required />
          </div>
          <button type="submit" className="primary-button">Send Message</button>
        </form>
      </div>
    </div>
  )
}
