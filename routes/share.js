const express = require('express');
const File = require('../models/File');

const router = express.Router();

// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await File.find().sort({ uploadDate: -1 });
    
    const filesWithUrls = files.map(file => ({
      id: file._id,
      originalName: file.originalName,
      size: file.size,
      mimetype: file.mimetype,
      uploadDate: file.uploadDate,
      downloadCount: file.downloadCount,
      shareUrl: `${req.protocol}://${req.get('host')}/download/${file.shareToken}`
    }));

    res.json({ success: true, files: filesWithUrls });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Get file by token
router.get('/:token', async (req, res) => {
  try {
    const file = await File.findOne({ shareToken: req.params.token });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({
      success: true,
      file: {
        id: file._id,
        originalName: file.originalName,
        size: file.size,
        mimetype: file.mimetype,
        uploadDate: file.uploadDate,
        downloadCount: file.downloadCount
      }
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
});

// Delete file
router.delete('/:id', async (req, res) => {
  try {
    const fs = require('fs');
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    if (fs.existsSync(file.filepath)) {
      fs.unlinkSync(file.filepath);
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

module.exports = router;