import Joi from 'joi'
import { ValidatedRequestSchema } from 'express-joi-validation'
import { ContainerTypes } from 'express-joi-validation'
const FileParamsSchema = Joi.object({
  id: Joi.string().uuid().required()
})



interface GetFileRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: string
  }
}

export { FileParamsSchema, GetFileRequestSchema }