const express = require("express");
const jwtAuth = require("./authentication");

const router = express.Router();

router.get("/api/checkToken", jwtAuth, (req, res) => {
  res.status(200).json({
    code: 200
  });
});

module.exports = router;
