import express from "express";
import PromiseModel from "../models/Promise.js";

const router = express.Router();

// 1️⃣ List all / filter by query
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const promises = await PromiseModel.find(filter);
    res.json(promises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// 2️⃣ CATEGORY ROUTE — MUST COME BEFORE "/:id"
// router.get("/category/:category", async (req, res) => {
//   try {
//     const cat = decodeURIComponent(req.params.category);
//     const promises = await PromiseModel.find({ category: cat });
//     res.json(promises);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// 3️⃣ Get a single promise
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

router.get("/debug/categories", async (req, res) => {
  const all = await PromiseModel.find();
  const categories = [...new Set(all.map((p) => p.category))];
  res.json(categories);
});


// Add
router.post("/", async (req, res) => {
  const newPromise = new PromiseModel(req.body);
  await newPromise.save();
  res.json(newPromise);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await PromiseModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await PromiseModel.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;

