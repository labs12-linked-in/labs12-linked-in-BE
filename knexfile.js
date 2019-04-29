require("dotenv").config();

const localPgConnection = {
  host: "localhost",
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "linkedinchrome"
};

const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "pg",
    connection: prodDbConnection,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" }
  },

  testing: {
    client: "pg",
    connection: { filename: "./data/db.db3" },
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" }
  },

  production: {
    client: "pg",
    connection: prodDbConnection,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds/" }
  }
};
