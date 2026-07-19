import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ClothingItem from '../models/ClothingItem.js';
import ExchangeRequest from '../models/ExchangeRequest.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

export const getItems = asyncHandler(async (req, res) => {
  const items = await ClothingItem.find({}).populate('owner', 'name email');
  res.json(items);
});

export const getExchanges = asyncHandler(async (req, res) => {
  const exchanges = await ExchangeRequest.find({})
    .populate('requester', 'name')
    .populate('item offeredItem');
  res.json(exchanges);
});

export const approveItem = asyncHandler(async (req, res) => {
  const item = await ClothingItem.findById(req.params.id);
  if (item) {
    item.status = 'available'; // Assuming logic where uploaded items might be 'pending' first, but for now we set to available
    await item.save();
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

export const rejectItem = asyncHandler(async (req, res) => {
  const item = await ClothingItem.findById(req.params.id);
  if (item) {
    // Optionally deduct points if they were already awarded
    await item.deleteOne();
    res.json({ message: 'Item rejected and removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});
