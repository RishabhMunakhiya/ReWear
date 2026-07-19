import SustainabilityRecord from '../models/SustainabilityRecord.js';

export const logSustainabilityImpact = async (userId) => {
  // A typical piece of clothing saves roughly 15 lbs of carbon and 500 gallons of water
  const CARBON_SAVED_PER_ITEM = 15; 
  const WATER_SAVED_PER_ITEM = 500;

  let record = await SustainabilityRecord.findOne({ user: userId });

  if (!record) {
    record = await SustainabilityRecord.create({
      user: userId,
      clothesReused: 1,
      carbonSaved: CARBON_SAVED_PER_ITEM,
      waterSaved: WATER_SAVED_PER_ITEM
    });
  } else {
    record.clothesReused += 1;
    record.carbonSaved += CARBON_SAVED_PER_ITEM;
    record.waterSaved += WATER_SAVED_PER_ITEM;
    await record.save();
  }

  return record;
};
