import { CreateFileResponseSchema } from './index'
import Joi from 'joi'
const CreateMultipleFileResponseSchema = Joi.array().items(CreateFileResponseSchema)

export { CreateMultipleFileResponseSchema }
