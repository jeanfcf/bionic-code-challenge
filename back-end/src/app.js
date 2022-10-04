const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8082;
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD || 'pjTwE6eHUrft03ap';

module.exports = class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  start() {
    mongoose
      .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bionic-code-challenge-c.iohldx5.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Successfully connected to the database.");
        this.server.listen(PORT, () => {
          console.info("Express server listening on port %d.", PORT);
        });
      })
      .catch((err) => console.error(err));
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST,GET");
        return res.status(200).send({});
      }
      return next();
    });
  }

  routes() {
    this.server.use(routes);
  }
};
