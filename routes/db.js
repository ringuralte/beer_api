const { Pool } = require("pg");

const createTableBeer = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
  beer(
    id serial PRIMARY KEY,
    name VARCHAR(512),
    unit INTEGER ,
    old_stock INTEGER ,
    change_stock INTEGER ,
    new_stock INTEGER ,
    unit_cost INTEGER ,
    cost INTEGER ,
    date VARCHAR(25) 
  )`;

  pool
    .query(queryString)
    .then(() => {
      console.log("beer table created");
    })
    .catch(err => console.log(err));
};

const createPasswordTable = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS 
  passwordTable(
    id serial PRIMARY KEY,
    password VARCHAR(512) NOT NULL
  )`;

  pool
    .query(queryString)
    .then(() => {
      console.log("user table created");
    })
    .catch(err => console.log(err.message));
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool
  .connect()
  .then(() => {
    console.log("connection to database success");
  })
  .then(createTableBeer)
  .then(createPasswordTable)
  .catch(err => console.log(err));

module.exports = pool;
