import { randomBytes } from 'node:crypto'
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import NGO from '../models/NGO.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth, requireRole('admin'))

function publicNgo(ngo) {
  return { id: ngo.id, name: ngo.name, location: ngo.location, description: ngo.description, isActive: ngo.isActive }
}

function makeInvitationCode() {
  return randomBytes(24).toString('base64url')
}

router.get('/ngos', async (request, response, next) => {
  try {
    const ngos = await NGO.find().sort({ name: 1 })
    return response.json(ngos.map(publicNgo))
  } catch (error) {
    return next(error)
  }
})

router.post('/ngos', async (request, response, next) => {
  try {
    const { name, location, description = '' } = request.body
    if (!name?.trim() || !location?.trim() || description.length > 500) {
      return response.status(400).json({ message: 'Provide the NGO name and location. Description must be 500 characters or fewer.' })
    }
    const slugBase = name.trim().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'ngo'
    const slug = `${slugBase}-${randomBytes(3).toString('hex')}`
    const invitationCode = makeInvitationCode()
    const ngo = await NGO.create({
      slug,
      name: name.trim(),
      location: location.trim(),
      description: description.trim(),
      membershipCodeHash: await bcrypt.hash(invitationCode, 12),
    })
    return response.status(201).json({ ngo: publicNgo(ngo), invitationCode })
  } catch (error) {
    return next(error)
  }
})

router.post('/ngos/:id/invitation-code', async (request, response, next) => {
  try {
    const ngo = await NGO.findById(request.params.id).select('+membershipCodeHash')
    if (!ngo) return response.status(404).json({ message: 'NGO not found.' })
    const invitationCode = makeInvitationCode()
    ngo.membershipCodeHash = await bcrypt.hash(invitationCode, 12)
    await ngo.save()
    return response.json({ invitationCode })
  } catch (error) {
    return next(error)
  }
})

export default router
