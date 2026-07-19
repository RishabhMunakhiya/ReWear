import mongoose from 'mongoose';

const clothingItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true, enum: ['Poor', 'Good', 'Very Good', 'Excellent'] },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rewearPointsValue: { type: Number, default: 0 },
  status: { type: String, enum: ['available', 'requested', 'exchanged'], default: 'available' }
}, {
  timestamps: true
});

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
export default ClothingItem;
