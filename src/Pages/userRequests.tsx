import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchDataOnce } from '../linksStoreToFirebase';
import styles from './UserRequests.module.css';
import { IObjectInfo } from '../type';

const UserRequests: React.FC = () => {
  const [stores, setStores] = useState<IObjectInfo[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      const data = fetchDataOnce(uid);
      if (data) {
        console.log(data);
        const storesArray: IObjectInfo[] = Object.values(data);
        setStores(storesArray);
      }
    }
  }, []);

  return (
    <div>
      <h1>User Requests</h1>
      <div>
        {stores.map((store) => (
          <div key={store.name} className={styles.storeTile}>
            <h3>{store.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRequests;
