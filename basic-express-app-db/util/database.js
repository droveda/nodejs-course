// const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   database: 'nodejs-course',
//   password: 'admin',
//   port: '5432',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
//   maxLifetimeSeconds: 60,
// });

// const query = (text, params) => {
//   return pool.query(text, params)
// }

// module.exports = { query };

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs-course', 'postgres', 'admin', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
});

module.exports = { sequelize };