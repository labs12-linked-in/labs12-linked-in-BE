const localPgConnection = {
  host: 'localhost',
  database: 'db',
  user: 'admin',
  password: 'password'
}

const prodDbConnection = process.env.DATABASE_URL || localPgConnection

module.exports = {
  development: {
    client: 'pg',
    connection: { filename: './data/db.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: { directory: './data/seeds' }
  },

  testing: {
    client: 'pg',
    connection: {
      filename: './data/db.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: prodDbConnection,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/'
    },
    useNullAsDefault: true
  }
}
