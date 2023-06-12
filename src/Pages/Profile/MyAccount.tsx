import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { auth, storageRef } from '../../firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import { updateProfile, sendEmailVerification } from 'firebase/auth';

import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import { Form, ImageUploader } from 'antd-mobile';
// import UploadImage from '../../Components/UploadImage';
import { Upload, Input } from 'antd';

const MyAccount: React.FC = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const user = auth.currentUser;

  const uploadProfilePicture = async (file: File) => {
    console.log(file);
    if (user) {
      updateProfile(user, {
        photoURL: 'file',
      }).then(function () {
        console.log('Image uploaded');
      });
    }
  };
  const onChange = () => {
    console.log('rien');
  };
  const beforeUpload = () => {
    console.log('rien');
  };
  if (user) {
    updateProfile(user, {
      displayName: 'customer ',
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/',
    }).then(function () {
      setDisplayName(user.displayName);
      console.log('TEST', user.displayName);
      console.log('TESTImage', user.photoURL);
    });
  }
  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
            <Upload
              listType="picture-card"
              beforeUpload={(file: File) => {
                uploadProfilePicture(file);
                return false; // Prevent default upload behavior
              }}
            />
          </Form.Item>
          <Form.Item label={<label className="item-form-label">Name</label>}>
            <Input />
          </Form.Item>
          <Form.Item
            label={<label className="item-form-label">Mail address</label>}
          >
            <Input />
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={onChange}
              beforeUpload={(file: File) => {
                uploadProfilePicture(file);
                return false; // Prevent default upload behavior
              }}
            >
              {' '}
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
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
