const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// connect redis
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () =>
  console.log("Connected to Redis successfully!")
);

redisClient.connect();

// connect to PostgreSQL
const PG_USER = "root";
const PG_PASSWORD = "example";
const PG_PORT = 5432;
const PG_HOST = "postgres";

const connectionString = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}`;
const pgClient = new Client({
  connectionString,
});

pgClient
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to PostgreSQL:", err);
  });

// connect to MongoDB
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
  redisClient.set("products", "products data");
  res.send("Welcome to my Node.js app! This is the home page!");
});

app.get("/products", async (req, res) => {
  const products = await redisClient.get("products");
  res.send(products || "No products found in Redis cache.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
