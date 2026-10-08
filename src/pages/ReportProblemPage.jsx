import { useState } from 'react'
import { calculatePriority, generateReportId } from '../services/mockService'

export default function ReportProblemPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Garbage',
    location: '',
    priority: 'Medium',
    contact: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [reportId, setReportId] = useState('')

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const generatedId = generateReportId()
    const estimatedPriority = calculatePriority({
      category: formData.category,
      urgency: formData.priority,
      affected: 42,
      safetyRisk: formData.category === 'Public Safety' || formData.category === 'Water Problems' ? 'High' : 'Medium',
    })

    setReportId(generatedId)
    setSubmitted(true)
    console.log('AI Suggested Priority:', estimatedPriority)
  }

  return (
    <div className="container page-section">
      <div className="section-heading">
        <span className="eyebrow">Community reporting</span>
        <h1>Report a problem</h1>
      </div>

      <form className="form-panel card-panel report-form" onSubmit={handleSubmit}>
        <div className="form-grid two-cols">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Problem Title" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Garbage">Garbage</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Street Lights">Street Lights</option>
            <option value="Water Problems">Water Problems</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
            <option value="Homelessness">Homelessness</option>
            <option value="Other">Other</option>
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="4" required />
          <textarea name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Information" rows="4" required />
        </div>

        <button type="submit" className="primary-button">Submit Report</button>

        {submitted && (
          <div className="report-success">
            <p><strong>Report ID:</strong> {reportId}</p>
            <p><strong>Status:</strong> Submitted</p>
            <div className="status-track compact">
              <span>Submitted</span>
              <span>Under Review</span>
              <span>Assigned</span>
              <span>In Progress</span>
              <span>Resolved</span>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
