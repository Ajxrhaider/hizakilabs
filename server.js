// Import necessary libraries
const express = require('express');
const admin = require('firebase-admin');

// --- FIREBASE SETUP ---
// You MUST replace 'path/to/your/serviceAccountKey.json' with the
// actual path to your downloaded service account key file.
// IMPORTANT: This file should be kept private and never committed to version control.
const serviceAccount = require('./serviceAccountKey.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Create an Express application
const app = express();
const port = 3000;

// Use built-in middleware to parse incoming JSON requests
app.use(express.json());

// Set up a simple CORS (Cross-Origin Resource Sharing) policy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// This is the API endpoint that will handle your form submissions.
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;

        // Log the received data to the server console
        console.log('Received form data:');
        console.log(formData);

        // Save the form data to a Firestore collection
        // The collection name is 'formSubmissions'. You can change this.
        const collectionRef = db.collection('formSubmissions');
        
        // Add a new document to the collection with the form data
        const docRef = await collectionRef.add(formData);

        // Send a success response back to the client with the new document ID
        console.log(`Document written with ID: ${docRef.id}`);
        res.status(200).json({ message: 'Form submitted successfully!', docId: docRef.id });

    } catch (error) {
        // Handle any errors that occur during processing or Firestore operations
        console.error('Error processing form submission:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server and make it listen for incoming requests
app.listen(port, () => {
    console.log(`Backend API listening at http://localhost:${port}`);
    console.log('Waiting for form submissions...');
});
