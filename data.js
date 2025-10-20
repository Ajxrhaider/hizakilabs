// server.js - A Node.js Express server with a Firestore form handler.

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// IMPORTANT: Replace with the path to your Firebase service account key.
// This file is generated from the Firebase Console and contains your credentials.
const serviceAccount = require('./path/to/your-service-account-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies from incoming requests

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form submission:', formData);

    // Validate incoming data
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Add a timestamp and save the data to a new document in the 'contactSubmissions' collection
    const submissionRef = await db.collection('contactSubmissions').add({
      ...formData,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Form data saved to Firestore with ID:', submissionRef.id);

    // Send a success response
    res.status(200).json({ message: 'Message received successfully!', submissionId: submissionRef.id });

  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
