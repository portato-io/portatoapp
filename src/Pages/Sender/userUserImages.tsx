// useUserImages.ts
import { useState, useEffect } from 'react';
import { storage } from '/home/mehdi/Documents/portatoapp/src/firebaseConfig.js';
import { ref, listAll } from 'firebase/storage';
import { fetchDataOnce } from '../../linksStoreToFirebase';

interface UploadFile {
  id: string;
  url: string;
}

const useUserImages = (userId: string) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const storageRef = ref(storage, 'files/uid');
  useEffect(() => {
    fetchAndSortRequests();
  }, [userId]);
  const fetchAndSortRequests = async () => {
    if (!userId) {
      console.log('uid is undefined');
      return;
    }

    try {
      const fetchData = await fetchDataOnce(userId, 'requests/');

      // Check if fetchData is not null or undefined before returning it
      if (fetchData) {
        console.log(fetchData);
      }
    } catch (error) {
      alert('no data');
    }
  };
  // useEffect(() => {
  //   const fetchUserImages = async (userId: string) => {
  //     try {
  //       const storageRef = ref(storage, `users/${userId}`);
  //       console.log(storageRef);
  //       // const listResult = await listAll(storageRef);

  //       // const images: UploadFile[] = await Promise.all(
  //       //   listResult.items.map(async (itemRef: any) => {
  //       //     const url = await itemRef.getDownloadURL();
  //       //     return { id: itemRef.name, url };
  //       //   })
  //       // );

  //       // setFileList(images);
  //     } catch (error) {
  //       console.error('Error fetching user images:', error);
  //     }
  //   };

  //   fetchUserImages(userId);
  // }, [userId]);

  // return fileList;
};

export default useUserImages;
