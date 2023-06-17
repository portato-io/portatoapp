import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { auth } from '../../firebaseConfig';
import 'firebase/auth';
import { updateProfile, updateEmail } from 'firebase/auth';

import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import { Button, Form, ImageUploader } from 'antd-mobile';
import { Upload, Input, message } from 'antd';

const MyAccount: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
      setImageUrl(user.photoURL);
    }
  }, []);

  const uploadProfilePicture = async (imgURL: any) => {
    setImageUrl(imgURL);
  };

  const showSuccessMessage = (message: string) => {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.className = 'popup';
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 2000);
  };

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const beforeUpload = () => {
    console.log('rien');
  };

  const onFinish = () => {
    if (user) {
      updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      }).then(function () {
        updateEmail(user, email || '')
          .then(function () {
            showSuccessMessage('User Information uploaded');
          })
          .catch((error) => {
            console.log(error); //TO DO: Reauthentificate the user when changing mail adress
          });
      });
    }
    console.log('submitted');
  };

  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
        <Form
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" size="large">
              Validate
            </Button>
          }
        >
          <Form.Header>My Account</Form.Header>
          <Form.Item
            label={<label className="item-form-label">Profile Picture</label>}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={(file: File) => {
                const imgURL = URL.createObjectURL(file);
                uploadProfilePicture(imgURL);
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
          <Form.Item label={<label className="item-form-label">Name</label>}>
            <Input onChange={onNameChange} value={name || ''} />
          </Form.Item>
          <Form.Item
            label={<label className="item-form-label">Mail address</label>}
          >
            <Input onChange={onEmailChange} value={email || ''} />
          </Form.Item>
        </Form>
      </div>
    </ProfilePageLayout>
  );
};

export default MyAccount;
