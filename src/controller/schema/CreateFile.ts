import Joi from 'joi'
const CreateFileResponseSchema = Joi.object({
  id: Joi.string().uuid().required(),
  path: Joi.string().required(),
  extension: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required()
})

export { CreateFileResponseSchema }
