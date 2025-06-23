const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// connect db
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo"; // tu peux passer l'IP de ton conteneur MongoDB ici ou DNS name if using Docker Compose 'service name', 'container name', 'ID'.

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to my Node.js app! This is the home page !!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
