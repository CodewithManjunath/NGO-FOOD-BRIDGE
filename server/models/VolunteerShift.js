import mongoose from 'mongoose'

const volunteerShiftSchema = new mongoose.Schema({
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true, index: true },
  ngoName: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, enum: ['Food pickup', 'Food sorting', 'Meal support', 'Cleaning'], required: true },
  description: { type: String, trim: true, maxlength: 1000, default: '' },
  location: { type: String, required: true, trim: true, maxlength: 250 },
  startsAt: { type: Date, required: true },
  slots: { type: Number, required: true, min: 1, max: 100 },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['Open', 'Closed', 'Cancelled'], default: 'Open' },
}, { timestamps: true })

volunteerShiftSchema.index({ status: 1, startsAt: 1, location: 1 })

export default mongoose.model('VolunteerShift', volunteerShiftSchema)
