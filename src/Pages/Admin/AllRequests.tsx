import React, { useState, useEffect } from 'react';
import FetchRequests from '../../Components/FetchRequests';
import PageLayout from '../Layouts/PageLayoutTest';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

const ADMIN = true;

const AllRequests: React.FC = () => {
  const [userIds, setUserIds] = useState<string[]>([]);

  const fetchUserIds = async (): Promise<void> => {
    const fetchedUserIds: string[] = [];
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);

    snapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      if (userId) {
        fetchedUserIds.push(userId);
      }
    });

    setUserIds(fetchedUserIds);
  };

  useEffect(() => {
    fetchUserIds();
  }, []);
  const containerHeight = window.innerHeight * 0.8;
  return (
    <PageLayout>
      <div style={{ height: containerHeight + 'px', overflowY: 'scroll' }}>
        {userIds.map((uid) => (
          <FetchRequests key={uid} uid={uid} admin={ADMIN} />
        ))}
      </div>
    </PageLayout>
  );
};

export default AllRequests;
