const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  shareToken: {
    type: String,
    required: true,
    unique: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  downloadCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('File', fileSchema);