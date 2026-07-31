import asyncHandler from 'express-async-handler';
import ClothingItem from '../models/ClothingItem.js';
import User from '../models/User.js';
import fs from 'fs';
import path from 'path';
import { itemUploadSchema } from '../validators/itemValidator.js';
import { calculateItemPoints } from '../services/pointsService.js';

export const uploadItem = asyncHandler(async (req, res) => {
  const { error } = itemUploadSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  if (!req.file) {
    res.status(400);
    throw new Error('No image provided');
  }

  const { title, description, category, size, condition } = req.body;
  const points = calculateItemPoints(condition);

  const item = await ClothingItem.create({
    title,
    description,
    category,
    size,
    condition,
    image: req.file ? req.file.path : '',
    owner: req.user._id,
    rewearPointsValue: points
  });

  // Automatically award points to uploader
  const user = await User.findById(req.user._id);
  user.rewearPoints += points;
  await user.save();

  res.status(201).json(item);
});

export const getItems = asyncHandler(async (req, res) => {
  const filter = { status: 'available' };
  
  if (req.query.category) filter.category = req.query.category;
  if (req.query.size) filter.size = req.query.size;
  if (req.query.condition) filter.condition = req.query.condition;

  const items = await ClothingItem.find(filter).populate('owner', 'name avatar');
  res.json(items);
});

export const getItemById = asyncHandler(async (req, res) => {
  const item = await ClothingItem.findById(req.params.id).populate('owner', 'name avatar');
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

export const deleteItem = asyncHandler(async (req, res) => {
  const item = await ClothingItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this item');
  }

  if (item.image && item.image.startsWith('uploads')) {
    try {
      fs.unlinkSync(item.image);
    } catch (err) {
      console.error('Failed to delete local image file', err);
    }
  }

  await item.deleteOne();
  res.json({ message: 'Item removed' });
});
