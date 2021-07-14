import { CreateFileResponseSchema } from './index'
import Joi from 'joi'
import { Fit } from '../../domain/model'

const CreateOptimiseFileBodySchema = Joi.object({
  id: Joi.string().required(),
  size: Joi.object({
    height: Joi.number().required(),
    width: Joi.number().required()
  }).required(),
  fit: Joi.string().valid('cover', 'contain', 'fill', 'inside', 'outside').default('cover'),
  quality: Joi.number().max(100).min(0)
})

interface CreateOptimiseFileRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    size: {
      height: number
      width: number
    },
    fit: Fit
    quality: number,
    id: string
  }
}

import { ValidatedRequestSchema } from 'express-joi-validation'
import { ContainerTypes } from 'express-joi-validation'

export {
  CreateOptimiseFileBodySchema,
  CreateOptimiseFileRequestSchema
}
