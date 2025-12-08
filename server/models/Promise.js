import mongoose from 'mongoose'

const PromiseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  progress: Number,
  status: String,
  
  bannerImage: { type: String, default: "" },     // <— NEW
  galleryImages: { type: [String], default: [] }, // <— NEW
  sources: { type: [String], default: [] },       // <— ALREADY EXISTS?
  notes: { type: [String], default: [] },         // <— NEW

}, { timestamps: true });

export default mongoose.model("Promise", PromiseSchema);
