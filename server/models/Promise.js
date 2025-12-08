import mongoose from 'mongoose'

const PromiseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  progress: Number,

  image: { type: String, default: "" },

  sources: {
    type: [String],
    default: [],
  },

  notes: {
    type: [
      {
        text: String,
        date: { type: Date, default: Date.now }
      }
    ],
    default: [],
  }
});

export default mongoose.model("Promise", PromiseSchema);
