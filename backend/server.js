require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cluster = require("cluster");
const numberOfCPUs = require("os").cpus().length;

const app = express();

app.use(express.json());
app.use(cors());
if (process.env !== "production") {
  app.use(morgan("tiny"));
}
app.use(helmet());
app.use(cookieParser());

const debug = require("debug")(process.env.DEBUG);

require("./config/database");

app.get("/", (req, res) => res.json({ msg: "Yes, actually working" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => debug(`App currently running on port,  ${PORT}`));
