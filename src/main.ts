import Express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import 'reflect-metadata';
import { FileRoute } from './controller/route';
import { createConnection, getConnection } from 'typeorm';
import { FileController } from './controller/service'
import { FileControllerError } from './controller/error'
import { FileService } from './domain/service';
import { FileProvider } from './data/service'
import { FileError } from './data/error'
import { FileMiddleware } from './controller/middleware';
import { notFound } from './controller/middleware'
import { FileDomainError } from './domain/error'
const PORT = process.env.PORT || 3000;
const startLog = async function log() {
  console.log(`server lauch on port ${PORT}`);
};
export class Main {
  static async start() {
    const envPath = process.env.NODE_ENV ?
      `/${__dirname}/../.env.${process.env.NODE_ENV}` :
      `/${__dirname}/../.env`
    dotenv.config({ path: envPath });
    await createConnection(process.env.CONNECTION_NAME ?? 'fasterize');
    const app = Express();
    app.use(cors())
    app.use(bodyParser.json())
    const connection = getConnection(process.env.CONNECTION_NAME)
    //Data Error
    const fileError = new FileError()
    const baseRouterv1 = {
      app,
      version: '1'
    };

    //Data Provider
    const fileDomainError = new FileDomainError()
    const fileProvider = new FileProvider({
      connection,
      filePath: __dirname,
      fileFolder: 'files',
      fileError
    })
    //Domaine
    const fileService = new FileService({ fileProvider, fileDomainError })
    //Controller
    const fileControllerError = new FileControllerError()

    const fileController = new FileController({ fileService, version: baseRouterv1.version })

    const fileMiddleware = new FileMiddleware({
      singleFileName: 'image',
      multipleFilesName: 'image',
      fileControllerError
    })
    new FileRoute({
      ...baseRouterv1,
      controller: fileController,
      singleFileMiddleware: fileMiddleware.singleFileMiddleware.bind(fileMiddleware),
      multipleFileMiddleware: fileMiddleware.multipleFileMiddleware.bind(fileMiddleware)
    });
    new notFound({ app })
    return app
  }

}

Main.start().then(app => app.listen(PORT, startLog))

