import mongoose from 'mongoose';

const sustainabilityRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clothesReused: { type: Number, default: 0 },
  carbonSaved: { type: Number, default: 0 }, // in lbs
  waterSaved: { type: Number, default: 0 }    // in gallons
}, {
  timestamps: true
});

const SustainabilityRecord = mongoose.model('SustainabilityRecord', sustainabilityRecordSchema);
export default SustainabilityRecord;
