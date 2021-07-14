import { Request, Response } from 'express';
import { FileService } from '../../domain/service'
import { StatusCodes } from 'http-status-codes';
import { GetFileRequestSchema, CreateOptimiseFileRequestSchema } from '../schema'
export class FileController {
  private readonly fileService: FileService
  private readonly version: string
  constructor({ fileService, version }: { fileService: FileService, version: string }) {
    this.fileService = fileService
    this.version = version
  }
  async upload(req: Request, res: Response): Promise<Response> {
    const file = await this.fileService.upload(req.file, this.version)
    return res.status(StatusCodes.CREATED).json(file)
  };
  async multipleUpload(req: Request, res: Response): Promise<Response> {
    const files = await Promise.all(
      Object.values(req.files).map(file => {
        return this.fileService.upload(file, this.version)
      }))
    return res.status(StatusCodes.CREATED).json(files)
  };

  async optimise(req: CreateOptimiseFileRequestSchema, res: Response): Promise<void> {
    const fileData = {
      ...req.body,
      version: this.version
    }
    try {
      const file = await this.fileService.getOptimiseFile(fileData)
      res.send(file)
    } catch (error) {
      const err = await error
      res.json(err)
    }
  };

  async download(req: GetFileRequestSchema, res: Response): Promise<void> {
    try {
      const file = await this.fileService.download(req.params.id)
      res.sendFile(file)
    } catch (error) {
      const err = await error
      res.status(err.status).json({ message: err.message })
    }
  }
}
