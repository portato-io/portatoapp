import React, { useState, useEffect, useContext } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { auth } from '../../firebaseConfig';
import 'firebase/auth';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, updateEmail } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import ProfilePageLayout from '../Layouts/ProfilePagesLayout';
import BackArrow from '../../Components/Buttons/BackArrow';
import { Button, Form } from 'antd-mobile';
import { Upload, Input, message } from 'antd';
import BackButton from '../../Components/Buttons/BackButton';

const MyAccount: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [name, setName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

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
  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  async function upload(file: File, currentUser: any, setLoading: any) {
    const fileRef = ref(storage, currentUser.uid + '.png');

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });

    setLoading(false);
    alert(t('accountPage.uploadedImageAlert'));
  }

  const onFinish = () => {
    if (user && photo) {
      upload(photo, user, setLoading);
      updateProfile(user, {
        displayName: name,
        // photoURL: imageUrl,
      }).then(function () {
        updateEmail(user, email || '')
          .then(function () {
            message.success('Successfully updated information');
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
      <div style={{ marginTop: 8 }}>{t('general.upload')}</div>
    </div>
  );
  return (
    <ProfilePageLayout>
      <div className="section ">
        <h4 className="title title-h4">{t('accountPage.myAccount')}</h4>
        <Form
          className="portato-form"
          onFinish={onFinish}
          footer={
            <div className="mod-display-flex mod-flex-space-between">
              <BackButton />
              <Button
                type="submit"
                className="button button-solid box-shadow box-radius-default box-shadow-effect"
              >
                {t('accountPage.validate')}
              </Button>
            </div>
          }
        >
          <Form.Item
            label={
              <label className="item-form-label text-align-center">
                {t('accountPage.profilePicture')}
              </label>
            }
          >
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={(file: File) => {
                setPhoto(file);
                const imgURL = URL.createObjectURL(file);
                uploadProfilePicture(imgURL);
                return false; // Prevent default upload behavior
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" className="profile-image" />
              ) : (
                uploadButton
              )}{' '}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Input
              onChange={onNameChange}
              value={name || ''}
              className="form-input"
              placeholder={t('accountPage.name') || 'Your name'}
            />
          </Form.Item>
          <Form.Item>
            <Input
              onChange={onEmailChange}
              value={email || ''}
              className="form-input"
              placeholder={t('accountPage.name') || 'Your name'}
            />
          </Form.Item>
        </Form>
      </div>
    </ProfilePageLayout>
  );
};

export default MyAccount;
