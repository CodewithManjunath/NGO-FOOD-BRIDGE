import { Router } from 'express'
import VolunteerShift from '../models/VolunteerShift.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()
const shiftCategories = ['Food pickup', 'Food sorting', 'Meal support', 'Cleaning']
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

router.get('/shifts', async (request, response, next) => {
  try {
    const filter = { status: 'Open', startsAt: { $gte: new Date() } }
    if (request.query.category && shiftCategories.includes(request.query.category)) filter.category = request.query.category
    if (request.query.location) filter.location = { $regex: escapeRegex(String(request.query.location).slice(0, 80)), $options: 'i' }
    if (request.query.q) {
      const query = escapeRegex(String(request.query.q).slice(0, 80))
      filter.$or = ['title', 'description', 'ngoName', 'location'].map((field) => ({ [field]: { $regex: query, $options: 'i' } }))
    }
    const shifts = await VolunteerShift.find(filter).sort({ startsAt: 1 }).limit(100).populate('volunteers', 'name')
    return response.json(shifts)
  } catch (error) {
    return next(error)
  }
})

router.use(requireAuth)

router.get('/volunteer/shifts/mine', requireRole('volunteer'), async (request, response, next) => {
  try {
    const shifts = await VolunteerShift.find({ volunteers: request.user.id }).sort({ startsAt: 1 })
    return response.json(shifts)
  } catch (error) {
    return next(error)
  }
})

router.post('/volunteer/shifts/:id/join', requireRole('volunteer'), async (request, response, next) => {
  try {
    const shift = await VolunteerShift.findOneAndUpdate({
      _id: request.params.id,
      status: 'Open',
      startsAt: { $gte: new Date() },
      volunteers: { $ne: request.user._id },
      $expr: { $lt: [{ $size: '$volunteers' }, '$slots'] },
    }, { $addToSet: { volunteers: request.user._id } }, { new: true })
    if (!shift) {
      return response.status(409).json({ message: 'This shift is closed, full, or you have already joined it.' })
    }
    return response.json(shift)
  } catch (error) {
    return next(error)
  }
})

router.get('/ngo/shifts', requireRole('ngo'), async (request, response, next) => {
  try {
    const shifts = await VolunteerShift.find({ ngo: request.user.ngo?._id }).sort({ startsAt: 1 }).populate('volunteers', 'name email')
    return response.json(shifts)
  } catch (error) {
    return next(error)
  }
})

router.post('/ngo/shifts', requireRole('ngo'), async (request, response, next) => {
  try {
    const { title, category, description, location, startsAt } = request.body
    const slots = Number(request.body.slots)
    const parsedStart = new Date(startsAt)
    if (!title?.trim() || !shiftCategories.includes(category) || !location?.trim() || Number.isNaN(parsedStart.getTime()) || parsedStart <= new Date() || !Number.isInteger(slots) || slots < 1 || slots > 100) {
      return response.status(400).json({ message: 'Provide a title, valid shift type, future time, location, and 1–100 volunteer places.' })
    }
    const shift = await VolunteerShift.create({
      ngo: request.user.ngo._id,
      ngoName: request.user.ngo.name,
      createdBy: request.user.id,
      title: title.trim(),
      category,
      description: description?.trim() || '',
      location: location.trim(),
      startsAt: parsedStart,
      slots,
    })
    return response.status(201).json(shift)
  } catch (error) {
    return next(error)
  }
})

export default router
