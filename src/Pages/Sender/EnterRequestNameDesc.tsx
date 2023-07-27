import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import UploadImage from '../../Components/UploadImage';

import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setObject } from '../../Store/actions/requestActionCreators';
import { IFirstObjectInfo, IRequestInfo } from '../../type';
import { useTranslation } from 'react-i18next';

import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const { TextArea } = Input;
const PROGRESS = 0;

const NEXT_SCREEN = '/createSendRequest/enter_request_size_weight_image';

const EnterRequestNameDesc: React.FC = () => {
  const { t } = useTranslation<string>();
  const [form] = Form.useForm();
  const [isFormFilled, setIsFormFilled] = useState(false);

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

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

  React.useEffect(() => {
    if (object.name != '' && object.description != '') {
      console.log('Je suis dnas le use effect');
      // setIsFormFilled(true);
    }
  }, []);
  const initialValues = {
    name: object.name,
    description: object.description,
  };

  const handleFormChange = () => {
    const formValues = form.getFieldsValue(true);
    const isFilled = Object.values(formValues).every(
      (value) => value !== undefined && !!value
    );
    setIsFormFilled(isFilled);
    console.log(
      'JE VAIS PLEURUER',
      formValues.name,
      formValues.description,
      formValues.image,
      isFilled
    );
  };
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    console.log('submitted');
  };
  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    setValues({
      ...object,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />

        <Form
          id="test"
          form={form}
          // onChange={handleFormChange}
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
            <UploadImage />
          </Form.Item>
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
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_1_objInfo_next_button_click');
            }}
            disabled={!isFormFilled}
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
