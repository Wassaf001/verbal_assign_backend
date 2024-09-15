const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5100; // Use environment port or default to 5100

// Middleware
app.use(cors({
  origin: 'https://resume-it-omega.vercel.app', // Replace with your actual frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route to handle PDF file upload and text extraction
app.post('/extract-text', upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = req.file.buffer;  // Use buffer directly from memory
    const data = await pdfParse(dataBuffer);

    res.json({ text: data.text });
  } catch (error) {
    console.error('Error during PDF extraction:', error.message);
    res.status(500).json({ error: 'Failed to extract text from PDF.' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;