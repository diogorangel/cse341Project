// server.js
const express = require("express");
const mongodb = require("./data/database");

const app = express();
const port = process.env.PORT || 8080;

// Middleware / routes
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