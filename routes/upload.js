const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/File');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter (optional - add file type restrictions)
const fileFilter = (req, file, cb) => {
  // Accept all files for now
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Upload endpoint
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const shareToken = uuidv4();

    const fileData = new File({
      originalName: req.file.originalname,
      filename: req.file.filename,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      shareToken: shareToken
    });

    await fileData.save();

    const shareUrl = `${req.protocol}://${req.get('host')}/download/${shareToken}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: fileData._id,
        originalName: fileData.originalName,
        size: fileData.size,
        shareToken: shareToken,
        shareUrl: shareUrl,
        uploadDate: fileData.uploadDate
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
});

module.exports = router;