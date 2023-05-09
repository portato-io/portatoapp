import React, { useState, useEffect } from 'react';
import FetchRequests from '../../Components/FetchRequests';
import PageLayout from '../Layouts/PageLayoutTest';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';

const AllRoutes: React.FC = () => {
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

  return (
    <PageLayout>
      <div>
        {userIds.map((uid) => (
          <FetchRequests key={uid} uid={uid} />
        ))}
      </div>
    </PageLayout>
  );
};

export default AllRoutes;
