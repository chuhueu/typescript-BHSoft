const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
MONGO_URL = "mongodb+srv://testBoy:hieu123@cluster0.qhhal.mongodb.net/login-BHSoft?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected...!"))
  .catch((err) => console.log({ message: err.message }));

// MIDDLEWARE
app.use(express.json());
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send("APP IS RUNNINGG");
});
app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});
