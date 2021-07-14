import multer from 'multer'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { multerErrorCode } from './MulterErrorCode'
import { FileControllerError, TypeError } from '../error'
export class FileMiddleware {
  private readonly singleFileHandler: RequestHandler
  private readonly multipleFilesHandler: RequestHandler
  private readonly fileControllerError: FileControllerError
  constructor({ singleFileName, multipleFilesName, fileControllerError }: {
    singleFileName: string, multipleFilesName: string, fileControllerError: FileControllerError
  }) {
    this.fileControllerError = fileControllerError
    this.singleFileHandler = multer().single(singleFileName)
    this.multipleFilesHandler = multer().array(multipleFilesName)
  }

  async singleFileMiddleware(req: Request, res: Response, next: NextFunction) {
    this.singleFileHandler(req, res, async error => {
      if (!req.file) {
        const response = await this.fileControllerError.noFile()
        return res.status(response.status).send(response.message)
      }
      if (!await this.checkExtension(req.file.mimetype)) {
        const response = await this.fileControllerError.wrongMimetype()
        return res.status(response.status).send(response.message)
      }
      if (error) {
        const response = await this.errorManagment(error)
        return res.status(response.status).send(response.message)
      }
      next()
    })
  }

  async multipleFileMiddleware(req: Request, res: Response, next: NextFunction) {
    this.multipleFilesHandler(req, res, async error => {
      for await (const file of Object.values(req.files)) {
        if (!req.files) {
          const response = await this.fileControllerError.noFile()
          return res.status(response.status).send(response.message)
        }
        if (!await this.checkExtension(file.mimetype)) {
          const response = await this.fileControllerError.wrongMimetype()
          return res.status(response.status).send(response.message)
        }
      }
      if (error) {
        const response = await this.errorManagment(error)
        return res.status(response.status).send(response.message)
      }
      next()
    })
  }

  private async checkExtension(mimetype: string) {
    const acceptType = ['jpeg']
    const regex = RegExp(`${acceptType.join('|')}`)
    return regex.test(mimetype)
  }

  private async errorManagment(error): Promise<TypeError> {
    switch (error.code) {
      case multerErrorCode.LIMIT_FIELD_COUNT:
        return this.fileControllerError.limitFieldCount({
          message: multerErrorCode.LIMIT_FIELD_COUNT
        })
      case multerErrorCode.LIMIT_FILE_SIZE:
        return this.fileControllerError.limitFieldCount({
          message: 'File to heavy'
        })
      case multerErrorCode.LIMIT_FILE_COUNT:
        return this.fileControllerError.limitFieldCount({
          message: multerErrorCode.LIMIT_FILE_COUNT
        })
      case multerErrorCode.LIMIT_FIELD_KEY:
        return this.fileControllerError.limitFieldCount({
          message: multerErrorCode.LIMIT_FIELD_KEY
        })
      case multerErrorCode.LIMIT_FIELD_VALUE:
        return this.fileControllerError.limitFieldCount({
          message: multerErrorCode.LIMIT_FIELD_VALUE
        })

      case multerErrorCode.LIMIT_FIELD_COUNT:
        return this.fileControllerError.limitFieldCount({
          message: multerErrorCode.LIMIT_FIELD_COUNT
        })
      case multerErrorCode.LIMIT_UNEXPECTED_FILE:
        return this.fileControllerError.limitFieldCount({
          message: 'You send to many file or you use wrong field name'
        })
    }
  }
}