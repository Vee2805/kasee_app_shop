const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', enterprise: 'Kasee Shop', consultant: 'Daniel Vaati' });
});

// Main route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Kasee Shop Portal is running on port ${PORT}`);
});
