const express = require('express');
const path = require('path');
const fs = require('fs');
const File = require('../models/File');

const router = express.Router();

// Download file by share token
router.get('/:token', async (req, res) => {
  try {
    const file = await File.findOne({ shareToken: req.params.token });

    if (!file) {
      return res.status(404).send('File not found');
    }

    // Check if file exists
    if (!fs.existsSync(file.filepath)) {
      return res.status(404).send('File not found on server');
    }

    // Increment download count
    file.downloadCount += 1;
    await file.save();

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Type', file.mimetype);

    // Stream file to response
    const fileStream = fs.createReadStream(file.filepath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).send('Error downloading file');
  }
});

module.exports = router;