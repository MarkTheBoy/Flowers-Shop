// filepath: /path/to/server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML file)
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received message from ${name} (${email}): ${message}`);
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});