import { message, Upload, Progress, Form } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addObjectImages,
  removeObjectImages,
} from '../Store/actions/requestActionCreators';

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
  getStorage,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebaseConfig';
const MAX_FILES = 10;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function getStorageRefFromUrl(url: string) {
  const storage = getStorage();
  const httpsReference = ref(storage, url);
  return httpsReference;
}

const UploadImage = () => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const beforeUpload = async (file: File) => {
    if (fileList.length >= MAX_FILES) {
      void message.error(`You can only upload up to ${MAX_FILES} images.`);
      return false;
    }

    if (file.size > MAX_SIZE) {
      void message.error(
        `The file size must not exceed ${MAX_SIZE / (1024 * 1024)}MB.`
      );
      return false;
    }

    setUploading(true);
    const newFile: UploadFile = {
      uid: Date.now().toString(),
      name: file.name,
      status: 'uploading',
      originFileObj: file as RcFile,
    };
    setFileList((prevFileList) => [...prevFileList, newFile]);
    try {
      await uploadImage(file, newFile.uid);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      setFileList((prevFileList) =>
        prevFileList.filter((f) => f.uid !== newFile.uid)
      );
      return false;
    }
    return false;
  };

  const uploadImage = (file: File, uid: string) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<void>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setProgress(progress);

          setFileList((prevFileList) =>
            prevFileList.map((f) => {
              if (f.uid === uid) {
                return { ...f, percent: Math.ceil(progress) };
              }
              return f;
            })
          );
        },
        (error: StorageError) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              dispatch(addObjectImages([downloadURL]));
              setUploading(false);

              setFileList((prevFileList) =>
                prevFileList.map((file) =>
                  file.uid === uid
                    ? { ...file, status: 'done', url: downloadURL }
                    : file
                )
              );
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 2 }}>Upload</div>
    </div>
  );

  const handleRemove = (file: UploadFile) => {
    const { uid, url } = file;
    const index = fileList.findIndex((f) => f.uid === uid);

    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    if (url) {
      dispatch(removeObjectImages(index));
      const storageRef = getStorageRefFromUrl(url);
      deleteObject(storageRef)
        .then(() => {
          console.log(`Successfully deleted file at ${url}`);
        })
        .catch((error: any) => {
          if (error instanceof StorageError) {
            console.error(`Error deleting file at ${url}:`, error);
          }
        });
    }

    setFileList(newFileList);
  };

  return (
    <Form.Item valuePropName="fileList">
      <Upload
        style={{ position: 'absolute', right: '1050px' }}
        action="/upload.do"
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        itemRender={(originNode, file) => {
          if (file.status === 'uploading' || file.status === 'done') {
            return (
              <div style={{ position: 'relative' }}>
                <img
                  src={
                    file.url ||
                    (file.originFileObj
                      ? URL.createObjectURL(file.originFileObj)
                      : '')
                  }
                  alt={file.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                {file.status === 'uploading' && (
                  <Progress
                    type="circle"
                    percent={file.percent}
                    width={40}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRemove(file)}
                >
                  <CloseOutlined />
                </div>
              </div>
            );
          }
          return originNode;
        }}
      >
        {fileList.length >= MAX_FILES ? null : uploadButton}
      </Upload>
    </Form.Item>
  );
};

export default UploadImage;
