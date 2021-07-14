import { Connection, InsertResult } from 'typeorm';
import { FileInterface } from '../../domain/interface'
import { File } from '../../domain/model'
import fs from 'fs'
import { FileError } from '../error'
export class FileProvider implements FileInterface {
  private readonly connection: Connection
  private readonly filePath: string
  private readonly fileFolder: string
  private readonly fileError: FileError
  constructor({ connection, filePath, fileFolder, fileError }:
    { connection: Connection, filePath: string, fileFolder: string, fileError: FileError }) {
    this.connection = connection
    this.filePath = filePath
    this.fileFolder = fileFolder
    this.fileError = fileError
  }
  async upload(file: Express.Multer.File, version: string): Promise<File> {
    const nameSplit = file.originalname.split('.')
    let extension = nameSplit[nameSplit.length - 1]
    const fileData = new File({
      extension: extension,
      name: file.originalname
    })
    let newFile = await this.createFile(fileData)
    fileData.path = `IMG-${newFile.identifiers[0].id}`
    fileData.url = `${process.env.FILE_URL}/${version}/file/${newFile.identifiers[0].id}`
    this.updateFile(fileData, newFile.identifiers[0].id)
    fileData.id = newFile.identifiers[0].id
    fs.writeFile(`${this.filePath}/${this.fileFolder}/${fileData.path}.${fileData.extension}`, file.buffer, (err) => {
      if (err) {
        this.deleteFile(fileData.id)
        throw this.fileError.unknowError()
      };
    });
    fileData
    return fileData
  }
  async uploadFromBuffer(path: string, file: Buffer): Promise<void> {
    fs.writeFile(path, file, (err) => {
      if (err) {
        throw this.fileError.unknowError()
      };
    });
  }

  async download(id: string): Promise<string> {
    const file = await this.connection
      .getRepository(FileProvider.name)
      .createQueryBuilder()
      .where("id = :id", { id: id })
      .getOne() as File;
    if (!!file === false)
      throw this.fileError.notFound()
    const path = `${this.filePath}/${this.fileFolder}/${file.path}.${file.extension}`
    if (!fs.existsSync(path)) {
      throw this.fileError.notFound()
    }
    return path
  }
  async getFilePath(id: string): Promise<string> {
    const file = await this.connection
      .getRepository(FileProvider.name)
      .createQueryBuilder()
      .where("id = :id", { id: id })
      .getOne() as File;
    if (!!file === false)
      throw this.fileError.notFound()
    const path = `${this.filePath}/${this.fileFolder}/${file.path}.${file.extension}`
    if (!fs.existsSync(path)) {
      throw this.fileError.notFound()
    }
    return path
  }

  async getFileData(id: string): Promise<File> {
    const fileData = await this.connection
      .getRepository(FileProvider.name)
      .createQueryBuilder()
      .where("id = :id", { id: id })
      .getOne() as File;
    if (!!fileData === false)
      throw this.fileError.notFound()
    return fileData
  }

  private async createFile(file: File): Promise<InsertResult> {
    const newFile = await this.connection
      .createQueryBuilder()
      .insert()
      .into(FileProvider.name)
      .values(file)
      .execute();
    file.path = `IMG-${newFile.identifiers[0].id}`
    return newFile
  }
  private async updateFile(file: File, id: string): Promise<void> {
    this.connection
      .createQueryBuilder()
      .update(FileProvider.name)
      .set(file)
      .where(`id = :id`, { id })
      .execute();
  }
  private async deleteFile(id: string) {
    this.connection
      .createQueryBuilder()
      .delete()
      .from(FileProvider.name)
      .where(`id = :id`, { id })
      .execute();
  }
}