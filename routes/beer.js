const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/api/postBeer", (req, res) => {
  const { name, oldStock, changeStock, cost } = req.body;
  const newStock = parseInt(oldStock, 10) + parseInt(changeStock, 10);
  const query = {
    text:
      "INSERT into beer (name, old_stock, change_stock, cost, new_stock, date) values ($1, $2, $3, $4, $5, (select current_date))",
    values: [name, oldStock, changeStock, cost, newStock]
  };
  db.query(query)
    .then(() =>
      res.status(200).json({
        message: "created beer"
      })
    )
    .catch(err => console.log(err));
});

router.get("/api/getBeer", (req, res) => {
  const query = {
    text: "SELECT * FROM beer"
  };
  db.query(query)
    .then(result => {
      res.status(200).json({
        beers: result.rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/api/deleteBeer", (req, res) => {
  const { id } = req.body;
  const query = {
    text: "DELETE from beer where id=$1",
    values: [id]
  };
  db.query(query)
    .then(result => {
      res.status(201).json({
        message: "deleted"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/api/updateBeer", (req, res) => {
  // console.log(req.body.data.id);
  const { id, name, old_stock, change_stock, cost } = req.body.data;
  const new_stock = parseInt(old_stock, 10) + parseInt(change_stock, 10);
  const query = {
    text:
      "UPDATE beer SET name=$1, old_stock=$2, change_stock=$3, cost=$4, new_stock=$5 WHERE id=$6",
    values: [name, old_stock, change_stock, cost, new_stock, id]
  };
  db.query(query)
    .then(result => {
      res.status(201).json({
        message: "updated"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
