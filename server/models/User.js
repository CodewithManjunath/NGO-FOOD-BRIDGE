import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['donor', 'volunteer', 'ngo', 'admin'], default: 'donor', required: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
  location: { type: String, trim: true, maxlength: 160, default: '' },
  donorKind: {
    type: String,
    enum: ['Household', 'Individual', 'Hotel', 'Restaurant', 'Anna / Charitable Trust', 'Grocery Store', 'Community Group', 'Other Organization'],
    default: 'Household',
  },
  organizationName: { type: String, trim: true, maxlength: 160, default: '' },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
