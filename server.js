// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3010; // ✅ Adjusted port as requested

app.use(express.static(path.join(__dirname, 'build')));

// ✅ Serve index.html for all client-side routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Production server is running on http://localhost:${PORT}`);
});
