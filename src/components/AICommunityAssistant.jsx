import { useState } from 'react'

const cannedResponses = {
  projects: 'You can explore community-led initiatives in the Projects page, including education, healthcare, and clean-city campaigns.',
  volunteer: 'Current volunteer opportunities include tree plantation, food distribution, and school support programs across major city zones.',
  report: 'Go to the Report a Problem page and submit the issue title, category, location, and urgency. A report ID will be generated automatically.',
  campaigns: 'You can check local campaigns by visiting the campaigns or project listings and filtering by location or category.',
  status: 'Use the dashboard and My Reports section to track each report through Submitted, Under Review, Assigned, In Progress, and Resolved.',
  default: 'I can help you find projects, volunteer opportunities, nearby campaigns, or explain how to report a problem in your community.',
}

export default function AICommunityAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Type a question to get quick NGO guidance.')

  const handleAsk = (event) => {
    event.preventDefault()
    const value = question.toLowerCase()
    if (value.includes('project')) setAnswer(cannedResponses.projects)
    else if (value.includes('volunteer')) setAnswer(cannedResponses.volunteer)
    else if (value.includes('report')) setAnswer(cannedResponses.report)
    else if (value.includes('campaign')) setAnswer(cannedResponses.campaigns)
    else if (value.includes('status')) setAnswer(cannedResponses.status)
    else setAnswer(cannedResponses.default)
    setQuestion('')
  }

  return (
    <div className="ai-assistant-wrap">
      {isOpen && (
        <div className="ai-panel card-panel">
          <div className="ai-header">
            <h4>Community AI</h4>
            <button type="button" className="secondary-button small-button" onClick={() => setIsOpen(false)}>Close</button>
          </div>
          <p>{answer}</p>
          <form onSubmit={handleAsk} className="ai-form">
            <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about projects, reports, or volunteering" />
            <button type="submit" className="primary-button">Ask</button>
          </form>
        </div>
      )}

      <button type="button" className="ai-toggle" onClick={() => setIsOpen((prev) => !prev)} aria-label="Open community AI assistant">
        🤖
        <span>Community AI</span>
      </button>
    </div>
  )
}
