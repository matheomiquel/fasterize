import { TypeError } from './typeError'
import { StatusCodes } from 'http-status-codes';
export class FileDomainError {
  async readFile(): Promise<TypeError> {
    return {
      message: "Problem unknow with file",
      status: StatusCodes.INTERNAL_SERVER_ERROR
    }
  }
}