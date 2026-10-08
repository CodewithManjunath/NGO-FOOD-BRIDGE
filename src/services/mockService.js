export function generateReportId() {
  const random = Math.floor(1000 + Math.random() * 9000)
  return `NGO-2026-${String(random).padStart(5, '0')}`
}

export function calculatePriority({ category, urgency, affected, safetyRisk }) {
  let score = 0

  if (category === 'Public Safety' || category === 'Water Problems' || category === 'Road Damage') score += 3
  if (category === 'Healthcare' || category === 'Street Lights') score += 2
  if (urgency === 'High') score += 3
  if (urgency === 'Medium') score += 2
  if (affected >= 50) score += 3
  if (affected >= 20) score += 2
  if (safetyRisk === 'High') score += 3

  if (score >= 8) return 'HIGH'
  if (score >= 5) return 'MEDIUM'
  return 'LOW'
}

export function getStatusSteps() {
  return ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved']
}
