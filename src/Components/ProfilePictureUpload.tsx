import React, { ChangeEvent, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC3X0ZVQIbTvJIpJfDGdrc2q8_JlSVzDT4',
  authDomain: 'portatoapp.firebaseapp.com',
  databaseURL:
    'https://portatoapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'portatoapp',
  storageBucket: 'portatoapp.appspot.com',
  messagingSenderId: '22027928847',
  appId: '1:22027928847:web:3588209ce56727486f2a7a',
  measurementId: 'G-Y4VZJ8CMPY',
};

firebase.initializeApp(firebaseConfig);
const ProfilePictureUpload: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleFileChange = async (event: any) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      try {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);

        const downloadURL = await fileRef.getDownloadURL();
        setProfilePicture(downloadURL);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <div className="upload-area" onClick={handleFileChange}>
      {profilePicture && (
        <img
          src={profilePicture}
          alt="Profile Picture"
          style={{
            width: 'min(min(50vw,50vh),250px)',
            height: 'min(min(50vw,50vh),250px)',
            borderRadius: '50%',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={{
          width: 'min(min(50vw,50vh),250px)',
          height: 'min(min(50vw,50vh),250px)',
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: profilePicture ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </div>
  );
};

export default ProfilePictureUpload;
