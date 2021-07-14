import { StatusCodes } from 'http-status-codes';
import { TypeError } from './'
export class FileError {
  notFound(): TypeError {
    return {
      message: 'File not found',
      status: StatusCodes.NOT_FOUND
    }
  }
  readFile(): TypeError {
    return {
      message: "Problem unknow with file",
      status: StatusCodes.INTERNAL_SERVER_ERROR
    }
  }
  unknowError(): TypeError {
    return {
      message: 'Unkonw error',
      status: StatusCodes.INTERNAL_SERVER_ERROR
    }
  }
}