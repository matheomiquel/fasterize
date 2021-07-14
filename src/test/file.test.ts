

import express, { response } from 'express'
import request from 'supertest'
import fs from 'fs'
const filePath = `${__dirname}/cat.jpeg`
const version = "1"
const fileController = "file"
import { Main } from '../main'
let app// = express();
console.log(filePath)
beforeAll(async () => {
  app = await Main.start()
})
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const createFile = await request(app).post(`/${version}/${fileController}`)
      .attach('image', filePath)
    expect(createFile.statusCode).toBe(201);
    expect(typeof createFile.body.id).toBe('string')
    expect(typeof createFile.body.path).toBe('string')
    expect(typeof createFile.body.extension).toBe('string')
    expect(typeof createFile.body.name).toBe('string')
    expect(typeof createFile.body.url).toBe('string')
    const fileOptimiseData = {
      id: createFile.body.id,
      size: {
        height: 500,
        width: 500
      },
      quality: 80
    }
    const fileOptimise = await request(app).post(`/${version}/${fileController}/optimise`)
      .send(fileOptimiseData)
    expect(fileOptimise.statusCode).toBe(200)
    expect(typeof fileOptimise.body.id).toBe('string')
    expect(typeof fileOptimise.body.path).toBe('string')
    expect(typeof fileOptimise.body.extension).toBe('string')
    expect(typeof fileOptimise.body.name).toBe('string')
    expect(typeof fileOptimise.body.url).toBe('string')
    const getFile = await request(app).get(`/${version}/${fileController}/${fileOptimise.body.id}`)
    expect(getFile.statusCode).toBe(200)
  });
  
});

