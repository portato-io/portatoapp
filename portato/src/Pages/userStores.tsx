import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import styles from "./UserStores.module.css";

const UserStores: React.FC = () => {
  const [stores, setStores] = useState<DispatchType[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      const database = getDatabase();
      const userStoresRef = ref(database, `users/${uid}/requests`);

      const onStoresUpdate = (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        if (data) {
          const storesArray: StoreData[] = Object.values(data);
          setStores(storesArray);
        }
      };

      // Attach the listener to receive updates
      onValue(userStoresRef, onStoresUpdate);

      // Clean up the listener when the component is unmounted
      return () => {
        userStoresRef.off("value", onStoresUpdate);
      };
    }
  }, []);

  return (
    <div>
      <h1>User Stores</h1>
      <div>
        {stores.map((store) => (
          <div key={store.storeId} className={styles.storeTile}>
            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStores;
