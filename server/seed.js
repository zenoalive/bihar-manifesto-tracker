import mongoose from "mongoose";
import dotenv from "dotenv";
import { initialPromises } from "../src/api/initialPromises.js"; // adjust path based on your structure
import PromiseModel from "./models/Promise.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected");

    // Clear existing data if needed
    await PromiseModel.deleteMany({});
    console.log("Old data cleared");

    // Insert all initial promises
    await PromiseModel.insertMany(initialPromises);
    console.log("Inserted initial promises");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
