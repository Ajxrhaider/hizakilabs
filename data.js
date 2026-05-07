/**
 * Server-side data handling and API endpoints
 * Refactored for better structure, error handling, and modularity
 */

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Firebase initialization (optional)
let db = null;
if (process.env.FIREBASE_PROJECT_ID) {
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

    db = admin.firestore();
    console.log('✅ Firebase initialized');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'not configured'
  });
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save to Firestore if available
    if (db) {
      const docRef = await db.collection('contact_submissions').add({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        ip: req.ip,
        userAgent: req.get('user-agent')
      });
      console.log(`✅ Form submitted to Firestore (ID: ${docRef.id})`);
    } else {
      console.log('📝 Form submitted (no database configured):', { name, email, subject });
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      submissionId: db ? 'saved' : 'logged'
    });

  } catch (error) {
    console.error('❌ Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Email endpoint (placeholder)
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // TODO: Integrate email service (SendGrid, Nodemailer, etc.)
    console.log(`📧 Email simulation: ${name} <${email}> - ${subject}`);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully (simulation)'
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
    message: 'Endpoint not found',
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
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Firebase: ${db ? 'enabled' : 'disabled'}`);
});

module.exports = app;
