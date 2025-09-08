// server.js - A simple Node.js Express server with a form handler.

const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON and URL-encoded data.
// express.json() for JSON data
// express.urlencoded({ extended: true }) for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware to allow requests from your frontend.
// The '*' allows requests from any origin. You can specify a specific URL for security.
app.use(cors());

// Define a POST endpoint for form submissions.
app.post('/submit-form', (req, res) => {
  // The form data is available in req.body.
  console.log('Received form submission:');
  console.log('Name:', req.body.name);
  console.log('Email:', req.body.email);
  console.log('Subject:', req.body.subject);
  console.log('Message:', req.body.message);

  // Send a success response back to the frontend.
  res.status(200).json({ message: 'Form submitted successfully!' });
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
