// import mongoose from "mongoose";

// const PromiseModel = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   category: String,
//   progress: Number,
// });

// export default mongoose.model("Promise", PromiseModel);

import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  publisher: String,
  publishedDate: Date,
  note: String,
}, { _id: false });

const promiseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, default: "pending" }, // optional business field
  imageUrl: { type: String, default: "" },
  sources: { type: [sourceSchema], default: [] },
}, { timestamps: true });

export default mongoose.model("Promise", promiseSchema);
