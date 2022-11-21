const express = require("express");
require("dotenv").config();
const routes = require("./routes/auth.routes");
const { connect } = require("./db");
const app = express();
app.use(express.json());
app.use("/api/v1/", routes);
(async () => {
  await connect();
  app.listen(3000, () => {
    console.log("started listening port 3000");
  });
})();
