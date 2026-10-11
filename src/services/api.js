const SESSION_STORAGE_KEY = 'foodbridge-session'

export async function apiRequest(path, options = {}) {
  let token = null
  try {
    token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || 'null')?.token || null
  } catch {
    token = null
  }

  const headers = new Headers(options.headers || {})
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response
  try {
    response = await fetch(`/api${path}`, { ...options, headers })
  } catch {
    throw new Error('Cannot reach the FoodBridge API. Start the server and check its MongoDB connection.')
  }

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    if ([502, 503, 504].includes(response.status)) {
      throw new Error('FoodBridge API is offline. Start the API and allow your current IP in MongoDB Atlas Network Access.')
    }
    throw new Error(payload.message || 'The request could not be completed.')
  }
  return payload
}
