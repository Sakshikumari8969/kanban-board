const path = require("path");
require("dotenv").config();
const express = require("express");
const router = require("./routes/route");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const cors = require("cors");
const { connectDatabase } = require("./db");

const { PORT } = process.env;
connectDatabase();
app.use(cors());
app.use(express.json());
app.use(multer().any());
app.use(express.static(path.join(__dirname, "../build")));

app.get("/ping", (req, res) => {
  res.json({
    message: "Pong",
  });
});

app.use("/", router);

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("*", (req, res) => {
  const file = path.join(__dirname, "../build/index.html");
  res.sendFile(file);
});
