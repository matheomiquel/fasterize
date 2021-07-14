import { StatusCodes } from 'http-status-codes';
import { TypeError } from './typeError'
export class FileControllerError {
  async limitFieldCount({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async limitFieldKey({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async limitFieldValue({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async limitFileCount({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async LimiteFileSize({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async limitePartCount({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async limitUnexpectedFile({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }
  async NotFound({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message
    }
  }

  async wrongMimetype(): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: 'We only accept JPEG extension'
    }
  }
  async noFile(): Promise<TypeError> {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: "You don't send any file"
    }
  }
  async BadRequest({ message }: { message: string }): Promise<TypeError> {
    return {
      status: StatusCodes.NOT_FOUND,
      message
    }
  }
}