import 'dotenv/config'
import bcrypt from 'bcryptjs'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import donationRoutes from './routes/donations.js'
import volunteerRoutes from './routes/volunteers.js'
import User from './models/User.js'

const app = express()
const port = Number(process.env.PORT || 4000)

app.disable('x-powered-by')
app.use(express.json({ limit: '1mb' }))
app.get('/api/health', (request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', donationRoutes)
app.use('/api', volunteerRoutes)
app.use((request, response) => response.status(404).json({ message: 'API endpoint not found.' }))
app.use((error, _request, response, _next) => {
  console.error(error)
  if (error.code === 11000) {
    return response.status(409).json({ message: 'A record with that value already exists.' })
  }
  if (error.name === 'ValidationError' || error.name === 'CastError' || error.type === 'entity.parse.failed') {
    return response.status(400).json({ message: 'The submitted data is invalid.' })
  }
  return response.status(500).json({ message: 'The server could not complete the request.' })
})

async function ensureAdminAccount() {
  if (!process.env.ADMIN_EMAIL && !process.env.ADMIN_PASSWORD) return
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error('Set both ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters.')
  }
  const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase()
  const existingAdmin = await User.findOne({ email: adminEmail })
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || 'FoodBridge Administrator',
      email: adminEmail,
      passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      role: 'admin',
      location: 'Head Office',
      donorKind: 'Individual',
    })
    console.info(`Provisioned admin account for ${adminEmail}`)
  } else if (existingAdmin.role !== 'admin') {
    throw new Error('ADMIN_EMAIL is already registered as a donor. Configure a different admin email.')
  }
}

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required. Copy .env.example to .env and configure it.')
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set to at least 32 characters.')
  }
  await mongoose.connect(process.env.MONGODB_URI)
  await ensureAdminAccount()
  app.listen(port, () => console.info(`FoodBridge API listening on http://localhost:${port}`))
}

start().catch((error) => {
  console.error(`Unable to start FoodBridge API: ${error.message}`)
  process.exit(1)
})
