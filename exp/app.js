require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());

    app.use("/api", routes);

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port http://localhost:${process.env.PORT}`
      );
    });
  });
