// server.js - Node.js Express server with Firestore integration for form submissions

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Replace with your actual service account key path
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('Received form submission:', req.body);

    // Validate incoming data
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Save the data to Firestore
    const submissionRef = await db.collection('formSubmissions').add({
      name,
      email,
      subject,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Form data saved to Firestore with ID:', submissionRef.id);

    res.status(200).json({ message: 'Form submitted successfully!', docId: submissionRef.id });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend API listening at http://localhost:${PORT}`);
  console.log('Waiting for form submissions...');
});