const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const saltRounds = 10;

const router = express.Router();

router.post("/api/login", (req, res) => {
  const { password } = req.body;
  const query = {
    text: "SELECT password FROM passwordtable WHERE id=$1",
    values: [1]
  };
  db.query(query).then(result => {
    if (result.rowCount) {
      const hash = result.rows[0].password;
      bcrypt
        .compare(password, hash)
        .then(same => {
          if (same === true) {
            console.log("success");
            const payload = "payload";
            const cookieTimer = new Date(Date.now() + 6000000);

            const token = jwt.sign(payload, process.env.TOKEN_SECRET);

            res
              .cookie("token", token, {
                expires: cookieTimer,
                httpOnly: true,
                sameSite: "None",
                secure: true
              })
              .status(200)
              .json({
                code: 200,
                message: "success"
              });
          } else {
            console.log("incorrect password");
            res.status(401).json({
              code: 401,
              msg: "incorrect password"
            });
          }
        })
        .catch(err => {
          res.status(404);
          console.log(err);
        });
    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const query = {
            text: "INSERT INTO passwordtable (password) values ($1)",
            values: [hash]
          };
          db.query(query)
            .then(result => {
              console.log("created");
              res.status(201).json({
                code: 201
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});

module.exports = router;
