import express from "express";
import PromiseModel from "../models/Promise.js";

const router = express.Router();

// Get all promises
router.get("/", async (req, res) => {
  const promises = await PromiseModel.find();
  res.json(promises);
});

// Get promises by category
router.get("/category/:category", async (req, res) => {
  try {
    const cat = decodeURIComponent(req.params.category);
    const promises = await PromiseModel.find({ category: cat });
    res.json(promises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const { category } = req.query;

  let filter = {};
  if (category) filter.category = category;

  const promises = await PromiseModel.find(filter);
  res.json(promises);
});



// Add a new promise
router.post("/", async (req, res) => {
  const newPromise = new PromiseModel(req.body);
  await newPromise.save();
  res.json(newPromise);
});
// Get a single promise
router.get("/:id", async (req, res) => {
  try {
    const promise = await PromiseModel.findById(req.params.id);
    if (!promise) {
      return res.status(404).json({ message: "Promise not found" });
    }
    res.json(promise);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});
// Update a promise
router.put("/:id", async (req, res) => {
  const updated = await PromiseModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete a promise
router.delete("/:id", async (req, res) => {
  await PromiseModel.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
