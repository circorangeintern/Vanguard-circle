const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

// POST /uploads — accepts one file (field name "file"), returns a public URL
// for it. Used by Resource posts as an alternative to pasting a link.
router.post("/", requireAuth, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.error(err.message || "Upload failed", 400);
    if (!req.file) return res.error("No file provided", 400);

    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.success({
      url,
      name: req.file.originalname,
      size: req.file.size,
    });
  });
});

module.exports = router;
