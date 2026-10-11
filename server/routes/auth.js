import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import NGO from '../models/NGO.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const donorKinds = ['Household', 'Individual', 'Hotel', 'Restaurant', 'Anna / Charitable Trust', 'Grocery Store', 'Community Group', 'Other Organization']

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    location: user.location,
    donorKind: user.donorKind,
    organizationName: user.organizationName,
    ngoId: user.ngo?._id?.toString() || user.ngo?.toString() || '',
    ngoName: user.ngo?.name || '',
  }
}

function createSession(user) {
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  return { token, user: publicUser(user) }
}

router.post('/register', async (request, response, next) => {
  try {
    const { name, email, password, location, donorKind = 'Household', organizationName = '' } = request.body
    const accountType = ['ngo', 'volunteer'].includes(request.body.accountType) ? request.body.accountType : 'donor'
    const normalizedEmail = String(email || '').trim().toLowerCase()
    if (!name?.trim() || !normalizedEmail || (accountType !== 'ngo' && !location?.trim())) {
      return response.status(400).json({ message: 'Name, email, and location are required for donor and volunteer accounts.' })
    }
    if (typeof password !== 'string' || password.length < 8) {
      return response.status(400).json({ message: 'Password must be at least 8 characters.' })
    }
    let ngo = null
    if (accountType === 'ngo') {
      ngo = await NGO.findOne({ _id: request.body.ngoId, isActive: true }).select('+membershipCodeHash')
      if (!ngo || !ngo.membershipCodeHash || !await bcrypt.compare(String(request.body.invitationCode || ''), ngo.membershipCodeHash)) {
        return response.status(403).json({ message: 'The NGO invitation code is invalid or not configured.' })
      }
    } else if (accountType === 'donor') {
      if (!donorKinds.includes(donorKind)) {
        return response.status(400).json({ message: 'Choose a valid donor type.' })
      }
      const requiresOrganization = !['Household', 'Individual'].includes(donorKind)
      if (requiresOrganization && !organizationName.trim()) {
        return response.status(400).json({ message: 'Organization name is required for this donor type.' })
      }
    }
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return response.status(409).json({ message: 'An account with this email already exists.' })
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 12),
      role: accountType,
      location: accountType === 'ngo' ? ngo.location : location.trim(),
      ...(accountType === 'ngo' ? { ngo: ngo.id } : accountType === 'donor' ? { donorKind, organizationName: organizationName.trim() } : {}),
    })
    if (accountType === 'ngo') await user.populate('ngo', 'name location')
    return response.status(201).json(createSession(user))
  } catch (error) {
    return next(error)
  }
})

router.post('/login', async (request, response, next) => {
  try {
    const email = String(request.body.email || '').trim().toLowerCase()
    const password = request.body.password
    const expectedRole = ['admin', 'ngo', 'volunteer'].includes(request.body.accountType) ? request.body.accountType : 'donor'
    const user = await User.findOne({ email, role: expectedRole }).select('+passwordHash')
    if (!user || typeof password !== 'string' || !await bcrypt.compare(password, user.passwordHash)) {
      return response.status(401).json({ message: 'Email or password is incorrect for that account type.' })
    }
    if (user.role === 'ngo') await user.populate('ngo', 'name location')
    return response.json(createSession(user))
  } catch (error) {
    return next(error)
  }
})

router.get('/me', requireAuth, (request, response) => response.json({ user: publicUser(request.user) }))

export default router
