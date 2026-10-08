import { projects } from '../data/mockData'

export default function ProjectsPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">NGO initiatives</span>
        <h1>Project Portfolio</h1>
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
              <div className="mini-metrics">
                <span>Target: {project.target}</span>
                <span>Volunteers: {project.volunteers}</span>
              </div>
              <div className="progress-row">
                <div className="progress-bar">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
                <strong>{project.progress}%</strong>
              </div>
              <button type="button" className="secondary-button inline-button">View Project</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
