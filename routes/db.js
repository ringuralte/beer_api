const { Pool } = require("pg");

const createTableBeer = () => {
  const queryString = `CREATE TABLE IF NOT EXISTS
  beer(
    id serial PRIMARY KEY,
    name VARCHAR(512) NOT NULL,
    old_stock INTEGER NOT NULL,
    change_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    cost INTEGER NOT NULL,
    date VARCHAR(25) NOT NULL
  )`;

  pool
    .query(queryString)
    .then(() => {
      console.log("beer table created");
    })
    .catch(err => console.log(err));
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
  .catch(err => console.log(err));

module.exports = pool;
