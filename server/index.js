import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});