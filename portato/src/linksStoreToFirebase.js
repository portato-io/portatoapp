import { getDatabase, ref, onValue, get, set } from "firebase/database";
import { database } from "./firebaseConfig";

export const uploadReduxStoreToFirebase = async (store) => {
  try {
    const currentState = store.getState();
    const reduxStoreRef = ref(database, "reduxStore");
    await set(reduxStoreRef, currentState);
    console.log("Redux store uploaded successfully to Firebase.");
  } catch (error) {
    console.error("Error uploading Redux store to Firebase2:", error);
  }
};

export const fetchDataOnce = async () => {
  try {
    const reduxStoreRef = ref(database, "reduxStore");
    const snapshot = await get(reduxStoreRef);

    if (snapshot.exists()) {
      console.log("Data:", snapshot.val());
    } else {
      console.log("No data found.");
    }
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
  }
};

export const listenForDataChanges = () => {
  const reduxStoreRef = ref(database, "reduxStore");

  onValue(reduxStoreRef, (snapshot) => {
    if (snapshot.exists()) {
      console.log("Data:", snapshot.val());
    } else {
      console.log("No data found.");
    }
  }, (error) => {
    console.error("Error fetching data from Firebase:", error);
  });
};
