import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// Single file upload
router.post("/single", upload.single("image"), (req, res) => {
  res.json({
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Multiple file upload
router.post("/multiple", upload.array("images", 10), (req, res) => {
  const files = req.files.map((f) => `/uploads/${f.filename}`);
  res.json({ files });
});

export default router;
