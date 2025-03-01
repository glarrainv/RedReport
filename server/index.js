require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

const db = getFirestore();

// API Route to Fetch Data
app.get("server/api/cases", async (req, res) => {
  try {
    const snapshot = await db.collection("Test").get();
    const cases = snapshot.docs.map((doc) => ({
      id: doc.id,
      Dorm: doc.data().Dorm,
      Time: doc.data().Time.toDate(),
      Type: doc.data().Type,
    }));
    res.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API Route to Post Data
app.post("server/api/upload", async (req, res) => {
  try {
    const { Dorm, Type } = req.body;
    await db.collection("Test").add({
      Dorm,
      Time: new Date(),
      Type,
    });
    res.json({ message: "Data added successfully!" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Failed to add data" });
  }
});

// Export the Express API as a Serverless Function
module.exports = app;
