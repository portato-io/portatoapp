const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Example functions from your earlier descriptions
// These functions should be defined in separate modules and imported here
const {
  uploadRequestToFirebase,
  fetchUserDataFromFirebase,
  updateUserProfileInFirebase,
  deleteUserFromFirebase,
  uploadImageToFirebaseStorage,
} = require('../src/linkStoreToFirebase');

// Upload Request to Firebase
exports.uploadRequest = functions.https.onRequest(async (req, res) => {
  // Expecting 'uid' from the request body for this function
  const { uid } = req.body;

  try {
    const result = await uploadRequestToFirebase(uid);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch User Data from Firebase
exports.fetchUserData = functions.https.onRequest(async (req, res) => {
  // UID might be part of the URL as a query parameter
  const { uid } = req.query;

  try {
    const userData = await fetchUserDataFromFirebase(uid);
    res.status(200).json({ success: true, userData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update User Profile in Firebase
exports.updateUserProfile = functions.https.onRequest(async (req, res) => {
  // Expecting 'uid' and 'userData' in the request body
  const { uid, userData } = req.body;

  try {
    const result = await updateUserProfileInFirebase(uid, userData);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete User from Firebase
exports.deleteUser = functions.https.onRequest(async (req, res) => {
  // UID might be part of the URL as a query parameter
  const { uid } = req.query;

  try {
    const result = await deleteUserFromFirebase(uid);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload Image to Firebase Storage
exports.uploadImage = functions.https.onRequest(async (req, res) => {
  // Expecting the image as 'file' in the form-data
  const file = req.files.file; // This requires 'busboy' or similar middleware to parse form-data

  try {
    const result = await uploadImageToFirebaseStorage(file);
    res.status(200).json({ success: true, imageUrl: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
