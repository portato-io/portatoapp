import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { auth } from '../../firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import { Form, ImageUploader } from 'antd-mobile';
import UploadImage from '../../Components/UploadImage';
import { Input } from 'antd';

const MyAccount: React.FC = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisplayName = async () => {
      const user = auth.currentUser;

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setDisplayName(idTokenResult.claims.name);
      }
    };

    fetchDisplayName();
  }, []);
  console.log(displayName);
  return (
    <ProfilePageLayout>
      <div
        className="container"
        style={{
          height: '80vh',
          position: 'absolute',
          marginTop: '10vh',
          width: '100vw',
          overflowY: 'scroll',
        }}
      >
        <Form>
          <Form.Header>My Account</Form.Header>
          <Form.Item
            label={<label className="item-form-label">Profile Picture</label>}
          >
            <UploadImage />
          </Form.Item>
          <Form.Item label={<label className="item-form-label">Name</label>}>
            <Input />
          </Form.Item>
          <Form.Item
            label={<label className="item-form-label">Mail address</label>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<label className="item-form-label">Living address</label>}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </ProfilePageLayout>
  );
};

export default MyAccount;
