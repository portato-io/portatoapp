import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import UploadImage from '../../Components/UploadImage';

import { Form, Input, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  remove_url_from_images,
  setObject,
} from '../../Store/actions/requestActionCreators';
import { IFirstObjectInfo, IRequestInfo } from '../../type';
import { useTranslation } from 'react-i18next';

import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

const { TextArea } = Input;
const PROGRESS = 0;

const NEXT_SCREEN = '/createSendRequest/enter_request_size_weight_image';

const EnterRequestNameDesc: React.FC = () => {
  const { t } = useTranslation<string>();
  const [form] = Form.useForm();

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  const [isUploading, setIsUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>();

  React.useEffect(() => {
    if (objecInfo.images && objecInfo.images.length > 0) {
      // Create an array of UploadFile objects from the objecInfo.images array
      // const uploadedFiles: UploadFile[] = objecInfo.images.map((image) => {
      const uploadedFiles: UploadFile[] = objecInfo.images.map(
        (url, index) => ({
          uid: String(index),
          name: `image-${index}.png`, // You can customize the name here if needed.
          status: 'done',
          url: String(url), // Assuming each element of objecInfo.images is already in "uid:url" format
        })
      );

      setFileList(uploadedFiles);
    }
  }, []);
  console.log(fileList);

  const [object, setValues] = useState<IFirstObjectInfo>({
    name: objecInfo.name,
    description: objecInfo.description,
    size: objecInfo.size,
    weight: objecInfo.weight,
    status: objecInfo.status,
    dealId: objecInfo.dealId,
    contactTimestamp: objecInfo.contactTimestamp,
  });

  React.useEffect(() => {
    dispatch(setObject(object));
  }, [object]);

  const initialValues = {
    name: object.name,
    description: object.description,
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    console.log('submitted');
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prevState: IFirstObjectInfo) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name);
  };
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    const { fileList: newFileList, file } = info;
    console.log(file);
    setFileList(newFileList);
    if (file.url) dispatch(remove_url_from_images(file.url));
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />

        <Form
          id="myForm"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={initialValues}
        >
          <h2>{t('requestInfo.title')}</h2>
          <Form.Item
            className="input-wrapper"
            label={t('requestInfo.name')}
            name="name"
            rules={[
              { required: true, message: 'Please input the object name' },
            ]}
          >
            <Input
              name="name"
              value={object.name}
              onChange={handleInputChange}
              placeholder={t('requestInfo.namePlaceholder') || ''}
            />
          </Form.Item>

          <Form.Item
            className="input-wrapper"
            label={t('requestInfo.description')}
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input the object description',
              },
            ]}
          >
            <TextArea
              name="description"
              value={object.description}
              onChange={handleInputChange}
              rows={3}
              placeholder={t('requestInfo.descriptionPlaceholder') || ''}
            />
          </Form.Item>

          <Form.Item
            className="input-wrapper"
            label={t('requestInfo.uploadImages')}
          >
            <UploadImage onUploadStatusChange={setIsUploading} />
          </Form.Item>
          {fileList ? (
            <Form.Item className="input-wrapper">
              <Upload
                fileList={fileList}
                listType="picture-card"
                onChange={handleChange}
              ></Upload>
            </Form.Item>
          ) : null}
        </Form>

        {/* TODO Mischa: Reserve space for Back/Next buttons in general container
          & move buttons out of div, for responsive scrolling! */}
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'send_1_objInfo_back_button_click');
            }}
          />
          <NextButton
            disabled={isUploading} // Disable the button if an upload is in progress
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_1_objInfo_next_button_click');
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterRequestNameDesc;
