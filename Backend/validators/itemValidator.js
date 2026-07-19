import Joi from 'joi';

export const itemUploadSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  category: Joi.string().required(),
  size: Joi.string().required(),
  condition: Joi.string().valid('Poor', 'Good', 'Very Good', 'Excellent').required()
});
