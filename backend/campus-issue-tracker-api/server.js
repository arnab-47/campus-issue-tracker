require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });