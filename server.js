/**
 * Backend Server for Hizaki Labs
 * Firebase Firestore Integration for form submissions
 * IMPORTANT: Keep serviceAccountKey.json private - add to .gitignore
 */

import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use(express.static('public'));

// Firebase initialization
if (!process.env.FIREBASE_PROJECT_ID) {
  console.warn('⚠️  WARNING: Firebase credentials not configured. Skipping Firebase init.');
} else {
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    console.log('✅ Firebase Admin SDK initialized');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
}

const db = admin.firestore();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Form submission endpoint
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save to Firestore
    const docRef = await db.collection('form_submissions').add({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    console.log(`✅ Form submitted successfully (ID: ${docRef.id})`);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      submissionId: docRef.id
    });

  } catch (error) {
    console.error('❌ Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Contact email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // TODO: Integrate email service (SendGrid, Nodemailer, etc.)
    // For now, just log it
    console.log(`📧 Email from ${email}: ${subject}`);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Hizaki Labs Backend running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
