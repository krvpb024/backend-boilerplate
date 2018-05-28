// Update with your config settings.
require('dotenv').config()

module.exports = {
  client: 'pg',
  // connection: process.env.DATABASE_URL,
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  pool: { min: 0, max: 7 },
  migrations: {
    directory: './db/migrations'
  }
}
