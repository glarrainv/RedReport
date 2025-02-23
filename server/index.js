require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK (Ensure service account credentials are set up)
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix for multiline private key
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

// Fetch data from Firestore
app.get("/api/import", async (req, res) => {
  try {
    const snapshot = await db.collection("Test").get();
    const cases = snapshot.docs.map((doc) => ({
      id: doc.id,
      Dorm: doc.data().Dorm,
      Time: doc.data().Time.toDate(), // Convert Firestore Timestamp
      Type: doc.data().Type,
    }));

    res.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this route in your backend
app.post("/api/upload", async (req, res) => {
  try {
    const { Dorm, Type } = req.body;

    if (!Dorm || Type === undefined) {
      return res.status(400).json({ error: "Missing Dorm or Type field" });
    }

    const newCase = {
      Dorm,
      Time: new Date(), // Firestore will store it as a Timestamp
      Type,
    };

    const docRef = await db.collection("Test").add(newCase);
    res.status(201).json({ id: docRef.id, ...newCase }); // Return created document
  } catch (error) {
    console.error("Error writing to Firestore:", error);
    res.status(500).json({ error: "Failed to write data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
