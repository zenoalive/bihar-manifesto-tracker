import mongoose from 'mongoose'

const PromiseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,

    progress: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    bannerImage: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },

    sources: { type: [String], default: [] },

    notes: [
      {
        text: String,
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);


export default mongoose.model("Promise", PromiseSchema);
