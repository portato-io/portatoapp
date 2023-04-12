import { database } from "./firebaseConfig";

export const uploadReduxStoreToFirebase = async (store) => {
  try {
    const currentState = store.getState();
    await database.ref("reduxStore").set(currentState);
    console.log("Redux store uploaded successfully to Firebase.");
  } catch (error) {
    console.error("Error uploading Redux store to Firebase:", error);
  }
};
