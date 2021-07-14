module.exports = {
  name: "fasterize",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "fasterize",
  synchronize: true,
  logging: false,
  entities: [
    "src/data/model/*.ts"
  ],
  cli: {
    entitiesDir: "dist/data/model",
    migrationsDir: "dist/migration"
  }
}