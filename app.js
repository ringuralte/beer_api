const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://sunhlukawnbeer.now.sh",
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const beers = require("./routes/beer");
const login = require("./routes/login");
const checkToken = require("./routes/checkToken");

app.use(checkToken);
app.use(beers);
app.use(login);

app.listen(process.env.PORT, () =>
  console.log(`listening on ${process.env.PORT}`)
);
