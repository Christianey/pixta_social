require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { authRoutes } = require("./routes/authRoutes");
const { userRoutes } = require("./routes/userRoutes");
const errorCntrls = require("./controllers/errorCntrls");

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

//ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//ERROR CONTROLLER
app.use(errorCntrls);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => debug(`App currently running on port,  ${PORT}`));
