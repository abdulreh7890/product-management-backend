import connectDB from "./Config/db.js";
import express from "express"
import dotenv from "dotenv";
import config from "./Config/config.js";
import categoryRoutes from "./Routes/categoryRoutes.js"
import productRoutes from "./Routes/productRoutes.js"
import userRoutes from "./Routes/userRoutes.js"

dotenv.config();

const app = express()

app.use(express.json())

connectDB()

app.use("/api", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api", userRoutes)

const PORT = process.env.PORT || 5000;




app.listen(config.port, () => {
  console.log(`${config.appName} running on http://localhost:${config.port}`);
});