import { Express, Request, Response } from 'express'
export class notFound {
  private readonly app: Express
  constructor({ app }: { app: Express }) {
    this.app = app
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)'
      })
    })
  }
}