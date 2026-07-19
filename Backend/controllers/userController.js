import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import SustainabilityRecord from '../models/SustainabilityRecord.js';

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getUserPoints = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      rewearPoints: user.rewearPoints,
      totalExchanges: user.totalExchanges,
      sustainabilityScore: user.sustainabilityScore
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getSustainabilityRecord = asyncHandler(async (req, res) => {
  const record = await SustainabilityRecord.findOne({ user: req.user._id });
  if (record) {
    res.json(record);
  } else {
    res.json({ clothesReused: 0, carbonSaved: 0, waterSaved: 0 }); // Default state if no exchanges completed yet
  }
});
