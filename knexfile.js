require('dotenv').config()

const localPgConnection = {
  host: '127.0.0.1',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'matt123!',
  database: 'linkedinchrome'
}

const prodDbConnection = process.env.DATABASE_URL || localPgConnection

module.exports = {
  development: {
    client: 'pg',
    connection: prodDbConnection,
    migrations: { directory: './data/migrations'},
    seeds: { directory: './data/seeds' }
  },

  testing: {
    client: 'pg',
    connection: { filename: './data/db.db3' },
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },

  production: {
    client: 'pg',
    connection: prodDbConnection,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds/' },
  }
}
