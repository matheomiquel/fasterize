import { File } from '../model'
export interface FileInterface {
  upload(file: Express.Multer.File, url: string): Promise<File>
  uploadFromBuffer(file: string, fileData: Buffer): Promise<void>
  download(id: string): Promise<string>
  getFileData(id: string): Promise<File>
  getFilePath(id: string): Promise<string>
}