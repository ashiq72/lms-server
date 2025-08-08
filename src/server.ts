import app from "./app";
import mongoose from "mongoose";
import config from "./config";

const PORT = 4000;

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(PORT, () =>
      console.log(`Server is running http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
}

connectDB();
