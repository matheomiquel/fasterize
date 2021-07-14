import { File, Fit, Size } from '../model'
import { FileInterface } from '../interface'
import { FileDomainError } from '../error'
import { FileFormat } from '../model'
import sharp from 'sharp'
export class FileService {
  private readonly fileProvider: FileInterface
  private readonly fileDomainError: FileDomainError
  constructor({ fileProvider, fileDomainError }:
    { fileProvider: FileInterface, fileDomainError: FileDomainError }) {
    this.fileProvider = fileProvider
    this.fileDomainError = fileDomainError
  }
  async upload(file: Express.Multer.File, version: string): Promise<File> {
    return await this.fileProvider.upload(file, version)
  }
  async download(id: string): Promise<string> {
    return await this.fileProvider.download(id)
  }
  async getOptimiseFile({ version, id, size, fit, quality }:
    { version: string, id: string, size: Size, fit: Fit, quality?: number }): Promise<File> {
    const [fileData, filePath] = await Promise.all([
      this.fileProvider.getFileData(id),
      this.fileProvider.getFilePath(id),
    ])
    const newFile = await sharp(filePath)
      .toFormat('jpeg', {
        quality: quality
      }).resize({
        width: size.width,
        height: size.height,
        fit: fit,
      }).toBuffer()
    await this.fileProvider.uploadFromBuffer(filePath, newFile)
    return fileData
  }
}