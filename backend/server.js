require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const debug = require("debug")(process.env.DEBUG);
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => debug(`App currently running on port ${PORT}`));
