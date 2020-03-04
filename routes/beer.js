const express = require("express");
const db = require("./db");
const jwtAuth = require("./authentication");

const router = express.Router();

router.post("/api/postBeer", jwtAuth, (req, res) => {
  const name = req.body.name;
  const unit = parseInt(req.body.unit, 10);
  const changeStock = parseInt(req.body.changeStock, 10);
  const oldStock = parseInt(req.body.oldStock, 10);
  const unitCost = parseInt(req.body.unitCost, 10);
  const newStock = oldStock + changeStock;
  const newCost = unit * unitCost;

  const query = {
    text:
      "INSERT into beer (name, unit, old_stock, change_stock, new_stock, unit_cost, cost, date) values ($1, $2, $3, $4, $5, $6, $7, (select current_date)) RETURNING *",
    values: [name, unit, oldStock, changeStock, newStock, unitCost, newCost]
  };
  db.query(query)
    .then(result => {
      res.status(201).json({
        code: 201,
        data: result.rows[0],
        message: "created beer"
      });
    })
    .catch(err => console.log(err));
});

router.get("/api/getBeer", jwtAuth, (req, res) => {
  const query = {
    text: "SELECT * FROM beer"
  };
  db.query(query)
    .then(result => {
      res.status(201).json({
        beers: result.rows,
        code: 201
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/api/deleteBeer", jwtAuth, (req, res) => {
  const { id } = req.body;
  const query = {
    text: "DELETE from beer where id=$1",
    values: [id]
  };
  db.query(query)
    .then(result => {
      res.status(201).json({
        code: 201,
        message: "deleted"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/api/updateBeer", jwtAuth, (req, res) => {
  const id = req.body.data.id;
  const name = req.body.data.name;
  const unit = parseInt(req.body.data.unit, 10);
  const change_stock = parseInt(req.body.data.change_stock, 10);
  const old_stock = parseInt(req.body.data.old_stock, 10);
  const unit_cost = parseInt(req.body.data.unit_cost, 10);
  const new_stock = old_stock + change_stock;
  const new_cost = unit * unit_cost;
  const query = {
    text:
      "UPDATE beer SET name=$1, old_stock=$2, change_stock=$3, unit_cost=$4, new_stock=$5, cost=$6, unit=$7 WHERE id=$8",
    values: [
      name,
      old_stock,
      change_stock,
      unit_cost,
      new_stock,
      new_cost,
      unit,
      id
    ]
  };
  db.query(query)
    .then(result => {
      res.status(201).json({
        code: 201,
        message: "updated"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
