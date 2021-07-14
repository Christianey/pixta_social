require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);
const mongoose = require("mongoose");

const options = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => debug("Database connected successfully"))
  .catch((error) => debug("A database error occured: ", error));
