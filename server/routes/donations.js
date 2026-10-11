import { Router } from 'express'
import Donation from '../models/Donation.js'
import NGO from '../models/NGO.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

router.get('/ngos', async (request, response, next) => {
  try {
    const ngos = await NGO.find({ isActive: true }).sort({ name: 1 }).select('name location description')
    return response.json(ngos.map((ngo) => ({ id: ngo.id, name: ngo.name, location: ngo.location, description: ngo.description })))
  } catch (error) {
    return next(error)
  }
})

router.post('/donations', requireAuth, requireRole('donor'), async (request, response, next) => {
  try {
    const body = request.body
    const recipientNgo = await NGO.findOne({ _id: body.recipientNgo, isActive: true })
    if (!recipientNgo) {
      return response.status(400).json({ message: 'Choose an active NGO recipient.' })
    }
    if (!['food', 'money'].includes(body.donationType)) {
      return response.status(400).json({ message: 'Choose a valid donation type.' })
    }

    const donation = {
      donor: request.user.id,
      donorName: request.user.organizationName || request.user.name,
      donorEmail: request.user.email,
      donorType: request.user.donorKind,
      donationType: body.donationType,
      recipientNgo: recipientNgo.id,
      recipientNgoName: recipientNgo.name,
    }
    if (body.donationType === 'food') {
      const quantity = Number(body.quantity)
      const pickupTime = new Date(body.pickupTime)
      if (!body.foodCategory || !Number.isFinite(quantity) || quantity <= 0 || !body.unit || !body.pickupLocation?.trim() || Number.isNaN(pickupTime.getTime())) {
        return response.status(400).json({ message: 'Complete the food type, quantity, and pickup details.' })
      }
      Object.assign(donation, {
        foodCategory: body.foodCategory,
        quantity,
        unit: body.unit,
        pickupLocation: body.pickupLocation.trim(),
        pickupTime,
      })
    } else {
      const amount = Number(body.amount)
      if (!Number.isFinite(amount) || amount < 1) {
        return response.status(400).json({ message: 'Enter a valid money pledge amount.' })
      }
      donation.amount = amount
    }

    const savedDonation = await Donation.create(donation)
    return response.status(201).json(savedDonation)
  } catch (error) {
    return next(error)
  }
})

router.get('/donations/mine', requireAuth, requireRole('donor'), async (request, response, next) => {
  try {
    const donations = await Donation.find({ donor: request.user.id }).sort({ createdAt: -1 }).limit(100)
    return response.json(donations)
  } catch (error) {
    return next(error)
  }
})

router.get('/admin/donations', requireAuth, requireRole('admin'), async (request, response, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(200)
    return response.json(donations)
  } catch (error) {
    return next(error)
  }
})

router.get('/ngo/donations', requireAuth, requireRole('ngo'), async (request, response, next) => {
  try {
    const donations = await Donation.find({ recipientNgo: request.user.ngo?._id }).sort({ createdAt: -1 }).limit(200)
    return response.json(donations)
  } catch (error) {
    return next(error)
  }
})

router.patch('/ngo/donations/:id/status', requireAuth, requireRole('ngo'), async (request, response, next) => {
  try {
    const nextStatus = request.body.status
    if (!['Accepted', 'Declined'].includes(nextStatus)) {
      return response.status(400).json({ message: 'Choose Accepted or Declined.' })
    }
    const donation = await Donation.findOne({
      _id: request.params.id,
      recipientNgo: request.user.ngo?._id,
      status: 'Awaiting NGO confirmation',
    })
    if (!donation) {
      return response.status(404).json({ message: 'This open donation is not assigned to your NGO.' })
    }
    donation.status = nextStatus
    await donation.save()
    return response.json(donation)
  } catch (error) {
    return next(error)
  }
})

export default router
