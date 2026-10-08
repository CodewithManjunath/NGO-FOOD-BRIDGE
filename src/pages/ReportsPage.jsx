import { useMemo, useState } from 'react'
import { categories, reports } from '../data/mockData'
import { calculatePriority, generateReportId, getStatusSteps } from '../services/mockService'

export default function ReportsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [priority, setPriority] = useState('All')

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesQuery = report.title.toLowerCase().includes(query.toLowerCase()) || report.location.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || report.category === category
      const matchesStatus = status === 'All' || report.status === status
      const matchesPriority = priority === 'All' || report.priority === priority
      return matchesQuery && matchesCategory && matchesStatus && matchesPriority
    })
  }, [category, priority, query, status])

  const [demoReport, setDemoReport] = useState({
    title: 'Street Light Repair',
    category: 'Street Lights',
    location: 'Koramangala',
  })

  const suggestedPriority = calculatePriority({
    category: demoReport.category,
    urgency: 'High',
    affected: 70,
    safetyRisk: 'High',
  })

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Community Issues</span>
        <h1>Reported problems</h1>
      </div>

      <div className="report-panel card-panel">
        <h3>AI Suggested Priority</h3>
        <p>
          <strong>{demoReport.title}</strong> in {demoReport.location} is recommended as <span className="priority-badge high">{suggestedPriority}</span>
        </p>
        <div className="status-track">
          {getStatusSteps().map((step) => (
            <span key={step} className="status-step">{step}</span>
          ))}
        </div>
      </div>

      <div className="filters-row card-panel">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects, problems, campaigns..." />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="card-grid three-column">
        {filteredReports.map((report) => (
          <article key={report.id} className="report-card card-panel">
            <img src={report.image} alt={report.title} />
            <div className="card-content">
              <div className="meta-row report-meta">
                <span className="tag">{report.category}</span>
                <span className="priority-badge medium">{report.priority}</span>
              </div>
              <h3>{report.title}</h3>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {report.date}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <p><strong>Report ID:</strong> {report.id}</p>
              <div className="progress-row">
                <div className="progress-bar"><span style={{ width: `${report.progress}%` }} /></div>
                <strong>{report.progress}%</strong>
              </div>
              <button type="button" className="secondary-button inline-button">View Details</button>
            </div>
          </article>
        ))}
      </div>

      <div className="report-id-box">
        <span>New report ID</span>
        <strong>{generateReportId()}</strong>
      </div>
    </div>
  )
}
