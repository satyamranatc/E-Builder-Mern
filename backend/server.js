import express from "express";
import cors from "cors";
import "dotenv/config.js";

import connectDB from "./config/dbConfig.js";

import stateRoute from "./routes/State.route.js";
import cityRoute from "./routes/City.route.js";
import propertyRoute from "./routes/Property.route.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});

app.use("/api/state", stateRoute);
app.use("/api/city", cityRoute);
app.use("/api/property", propertyRoute);


app.listen(PORT, () => {
  console.log('Server running ...')
});
