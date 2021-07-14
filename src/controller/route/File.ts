import { Express, NextFunction } from 'express';
import { FileController } from '../service';
import {
  FileParamsSchema,
  CreateFileResponseSchema,
  CreateMultipleFileResponseSchema,
  CreateOptimiseFileBodySchema,
} from '../schema'
import { createValidator } from 'express-joi-validation'
const validator = createValidator()
export class FileRoute {
  private readonly endpoint: string
  constructor({ version, app, controller, singleFileMiddleware, multipleFileMiddleware }:
    {
      version: string,
      app: Express, controller: FileController,
      singleFileMiddleware: NextFunction
      multipleFileMiddleware: NextFunction
    }) {
    this.endpoint = 'file';
    app.get(
      `/${version}/${this.endpoint}/:id`,
      validator.params(FileParamsSchema),
      controller.download.bind({ ...this, ...controller })
    );
    app.post(
      `/${version}/${this.endpoint}`,
      singleFileMiddleware,
      validator.response(CreateFileResponseSchema),
      controller.upload.bind({ ...this, ...controller })
    );
    app.post(
      `/${version}/${this.endpoint}/multiple`,
      multipleFileMiddleware,
      validator.response(CreateMultipleFileResponseSchema),
      controller.multipleUpload.bind({ ...this, ...controller })
    );
    app.post(
      `/${version}/${this.endpoint}/optimise`,
      validator.body(CreateOptimiseFileBodySchema),
      controller.optimise.bind({ ...this, ...controller })
    );
  }
}