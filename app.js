const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const server = require("http").Server(app);

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://sunhlukawnbeer.now.sh",
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const beers = require("./routes/beer");

app.use(beers);

server.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
