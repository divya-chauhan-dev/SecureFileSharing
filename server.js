const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const uploadRoute = require('./routes/upload');
const shareRoute = require('./routes/share');
const downloadRoute = require('./routes/download');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/fileSharing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/upload', uploadRoute);
app.use('/api/files', shareRoute);
app.use('/download', downloadRoute);

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Local network access: http://YOUR_LOCAL_IP:${PORT}`);
});