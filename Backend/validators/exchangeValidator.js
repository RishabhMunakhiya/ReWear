import Joi from 'joi';

export const exchangeRequestSchema = Joi.object({
  itemId: Joi.string().required(), // The item they want
  offeredItemId: Joi.string().required() // The item they are offering
});

export const exchangeActionSchema = Joi.object({
  requestId: Joi.string().required()
});
