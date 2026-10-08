import { projects } from '../data/mockData'

export default function ManageProjects() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Program management</span>
        <h1>Manage NGO Projects</h1>
      </div>

      <div className="card-grid three-column">
        {projects.map((project) => (
          <article key={project.id} className="project-card card-panel">
            <img src={project.image} alt={project.name} />
            <div className="card-content">
              <h3>{project.name}</h3>
              <p>{project.location}</p>
              <div className="progress-row">
                <div className="progress-bar"><span style={{ width: `${project.progress}%` }} /></div>
                <strong>{project.progress}%</strong>
              </div>
              <div className="admin-actions">
                <button type="button" className="secondary-button small-button">Edit</button>
                <button type="button" className="secondary-button small-button">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
