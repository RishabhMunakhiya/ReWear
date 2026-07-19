import asyncHandler from 'express-async-handler';
import ExchangeRequest from '../models/ExchangeRequest.js';
import ClothingItem from '../models/ClothingItem.js';
import User from '../models/User.js';
import { exchangeRequestSchema, exchangeActionSchema } from '../validators/exchangeValidator.js';
import { calculateExchangeBonus } from '../services/pointsService.js';
import { logSustainabilityImpact } from '../services/sustainabilityService.js';

export const requestExchange = asyncHandler(async (req, res) => {
  const { error } = exchangeRequestSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { itemId, offeredItemId } = req.body;

  const targetItem = await ClothingItem.findById(itemId);
  const offeredItem = await ClothingItem.findById(offeredItemId);

  if (!targetItem || !offeredItem) {
    res.status(404);
    throw new Error('Item not found');
  }

  if (targetItem.status !== 'available' || offeredItem.status !== 'available') {
    res.status(400);
    throw new Error('One or both items are no longer available');
  }

  const exchangeRequest = await ExchangeRequest.create({
    requester: req.user._id,
    item: itemId,
    offeredItem: offeredItemId
  });

  targetItem.status = 'requested';
  offeredItem.status = 'requested';
  await targetItem.save();
  await offeredItem.save();

  res.status(201).json(exchangeRequest);
});

export const acceptExchange = asyncHandler(async (req, res) => {
  const { requestId } = req.body;
  const request = await ExchangeRequest.findById(requestId).populate('item');

  if (!request) {
    res.status(404);
    throw new Error('Exchange request not found');
  }

  if (request.item.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to accept this request');
  }

  request.status = 'accepted';
  await request.save();
  res.json(request);
});

export const rejectExchange = asyncHandler(async (req, res) => {
  const { requestId } = req.body;
  const request = await ExchangeRequest.findById(requestId).populate('item');

  if (!request) {
    res.status(404);
    throw new Error('Exchange request not found');
  }

  request.status = 'rejected';
  await request.save();

  // Revert item statuses
  await ClothingItem.findByIdAndUpdate(request.item._id, { status: 'available' });
  await ClothingItem.findByIdAndUpdate(request.offeredItem, { status: 'available' });

  res.json(request);
});

export const completeExchange = asyncHandler(async (req, res) => {
  const { requestId } = req.body;
  const request = await ExchangeRequest.findById(requestId).populate('item offeredItem');

  if (!request || request.status !== 'accepted') {
    res.status(400);
    throw new Error('Invalid request or not accepted yet');
  }

  request.status = 'completed';
  await request.save();

  // Mark items as exchanged
  request.item.status = 'exchanged';
  request.offeredItem.status = 'exchanged';
  await request.item.save();
  await request.offeredItem.save();

  // Update Users Stats
  const requester = await User.findById(request.requester);
  const owner = await User.findById(request.item.owner);

  const bonus = calculateExchangeBonus();
  
  requester.rewearPoints += bonus;
  requester.totalExchanges += 1;
  requester.sustainabilityScore += 50;

  owner.rewearPoints += bonus;
  owner.totalExchanges += 1;
  owner.sustainabilityScore += 50;

  await requester.save();
  await owner.save();

  // Track Sustainability
  await logSustainabilityImpact(requester._id);
  await logSustainabilityImpact(owner._id);

  res.json({ message: 'Exchange completed successfully', request });
});

export const getMyExchanges = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const requests = await ExchangeRequest.find({
    $or: [{ requester: userId }]
  }).populate('item offeredItem requester');
  
  const incoming = await ExchangeRequest.find().populate({
    path: 'item',
    match: { owner: userId }
  }).populate('offeredItem requester');

  const filteredIncoming = incoming.filter(req => req.item !== null);

  res.json({
    outgoing: requests,
    incoming: filteredIncoming
  });
});
