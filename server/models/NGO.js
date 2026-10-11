import mongoose from 'mongoose'

const ngoSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxlength: 500, default: '' },
  membershipCodeHash: { type: String, select: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('NGO', ngoSchema)
