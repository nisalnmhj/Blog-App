import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import blogRoutes from './routes/blogRoutes.js';
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); //Middleware for parsing request body

app.use('/blogs', blogRoutes);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listnening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
