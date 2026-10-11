import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function requireAuth(request, response, next) {
  const token = request.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) {
    return response.status(401).json({ message: 'Please sign in to continue.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    request.user = await User.findById(payload.sub).populate('ngo', 'name location')
    if (!request.user) {
      return response.status(401).json({ message: 'This account is no longer available.' })
    }
    return next()
  } catch {
    return response.status(401).json({ message: 'Your session is invalid or expired. Please sign in again.' })
  }
}

export function requireRole(role) {
  return (request, response, next) => {
    if (request.user?.role !== role) {
      return response.status(403).json({ message: 'You do not have permission to access this resource.' })
    }
    return next()
  }
}
