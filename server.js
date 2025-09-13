// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 8080;

// Middleware / routes //app.use(bodyParser.json()); always before
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/", require("./routes"));

// Initialize DB before starting server
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
  } else {
    console.log("Database initialized");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
});