import mongoose from 'mongoose'

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  donorName: { type: String, required: true, trim: true, maxlength: 160 },
  donorEmail: { type: String, required: true, lowercase: true, trim: true },
  donorType: { type: String, required: true, trim: true },
  donationType: { type: String, enum: ['food', 'money'], required: true },
  recipientNgo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
  recipientNgoName: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Awaiting NGO confirmation', 'Accepted', 'Pickup scheduled', 'Completed', 'Declined'], default: 'Awaiting NGO confirmation' },
  foodCategory: { type: String, trim: true },
  quantity: { type: Number, min: 0.01 },
  unit: { type: String, enum: ['kg', 'servings', 'crates', 'packs'] },
  pickupLocation: { type: String, trim: true, maxlength: 300 },
  pickupTime: { type: Date },
  amount: { type: Number, min: 1 },
}, { timestamps: true })

donationSchema.index({ createdAt: -1 })

export default mongoose.model('Donation', donationSchema)
