import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { communityStats, impactMetrics, projects, volunteerOpportunities } from '../data/mockData'

export default function HomePage() {
  const [counts, setCounts] = useState(Array(impactMetrics.length).fill(0))

  useEffect(() => {
    const timers = impactMetrics.map((item, index) =>
      setTimeout(() => {
        setCounts((prev) => {
          const next = [...prev]
          next[index] = item.value
          return next
        })
      }, index * 200),
    )

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className="page-section">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Local action. Lasting impact.</span>
            <h1>Together, We Can Build a Better Community</h1>
            <p>
              Report problems, volunteer for causes, support local initiatives, and help create meaningful change in your community.
            </p>
            <div className="hero-actions">
              <Link to="/reports" className="primary-button">Report a Problem</Link>
              <Link to="/volunteer" className="secondary-button">Become a Volunteer</Link>
              <Link to="/projects" className="ghost-button">Explore Projects</Link>
            </div>
          </div>

          <div className="hero-visual card-panel">
            <div className="mini-card success-card">
              <strong>2,917</strong>
              <span>Issues resolved</span>
            </div>
            <div className="mini-card info-card">
              <strong>126</strong>
              <span>Community projects</span>
            </div>
            <div className="mini-card warning-card">
              <strong>1,248</strong>
              <span>Active volunteers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid container">
        {communityStats.map((item) => (
          <div key={item.label} className="stat-card card-panel">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <span className="eyebrow">What we’re building</span>
          <h2>Active community projects</h2>
        </div>

        <div className="card-grid three-column">
          {projects.map((project) => (
            <article key={project.id} className="project-card card-panel">
              <img src={project.image} alt={project.name} />
              <div className="card-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="meta-row">
                  <span>{project.location}</span>
                  <span>{project.status}</span>
                </div>
                <div className="progress-row">
                  <div className="progress-bar"><span style={{ width: `${project.progress}%` }} /></div>
                  <strong>{project.progress}%</strong>
                </div>
                <Link to="/projects" className="text-link">View Project</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block impact-section">
        <div className="section-heading">
          <span className="eyebrow">Our community impact</span>
          <h2>People, projects, and progress</h2>
        </div>

        <div className="impact-grid">
          {impactMetrics.map((metric, index) => (
            <div key={metric.label} className="impact-card card-panel">
              <strong>{counts[index] || 0}</strong>
              <span>{metric.label}</span>
            </div>
          ))}

          <div className="impact-card card-panel map-card" aria-label="Community map activity overview">
            <div className="map-grid" />
            <span className="map-dot" />
            <span className="map-dot" />
            <span className="map-dot" />
            <span className="map-dot" />
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <span className="eyebrow">Volunteer energy</span>
          <h2>Open opportunities</h2>
        </div>

        <div className="card-grid three-column">
          {volunteerOpportunities.slice(0, 3).map((opportunity) => (
            <article key={opportunity.id} className="volunteer-card card-panel">
              <div className="card-content">
                <span className="tag">{opportunity.category}</span>
                <h3>{opportunity.title}</h3>
                <p><strong>Location:</strong> {opportunity.location}</p>
                <p><strong>Date:</strong> {opportunity.date}</p>
                <p><strong>Volunteers Needed:</strong> {opportunity.volunteersNeeded}</p>
                <p><strong>Registered:</strong> {opportunity.registered}</p>
                <Link to="/volunteer" className="primary-button inline-button">Join Now</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
