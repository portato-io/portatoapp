import React, { useState, useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import UploadImage from '../../Components/UploadImage';

import { Typography, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CAPACITY_OPTIONS } from '../../constant';
import { setObject } from '../../Store/actions/requestActionCreators';
import { IFirstObjectInfo, IRequestInfo } from '../../type';
import { useTranslation } from 'react-i18next';
import { Selector } from 'antd-mobile';

const { Title } = Typography;
const { TextArea } = Input;
const PROGRESS = 0;

const NEXT_SCREEN = '/createSendRequest/enter_address';

const EnterObjInfo: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string

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

  const onFinish = (values: any) => {
    console.log({ values });
  };

  const dispatch = useDispatch();
  const handleCapChange = (e: any) => {
    setValues({
      ...object,
      size: e,
    });
  };

  const handleInputChange = (e: any) => {
    console.log(e);
    setValues({
      ...object,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={3}>{t('requestInfo.title')}</Title>
            <Form.Item
              label={
                <label className="font-bold">{t('requestInfo.name')}</label>
              }
              //name="name"
              //rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                name="name"
                value={object.name}
                onChange={handleInputChange}
                placeholder={t('requestInfo.namePlaceholder') || ''}
              />
            </Form.Item>

            <Form.Item
              label={
                <label className="font-bold">
                  {t('requestInfo.description')}
                </label>
              }

              //rules={[{ required: true, message: 'Please input description!' }]}
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
              label={
                <label className="font-bold">{t('requestInfo.size')}</label>
              }
            >
              <Selector
                columns={2}
                options={CAPACITY_OPTIONS}
                onChange={handleCapChange}
                defaultValue={[object.size[0]]}
                className="form-element-centered"
                style={{
                  marginTop: '20px',
                  '--border-radius': '100px',
                  '--border': 'solid transparent 1px',
                  '--checked-border': 'solid var(--adm-color-primary) 1px',
                  '--padding': '8px 24px',
                }}
              />
            </Form.Item>

            <Form.Item
              label={
                <label className="font-bold">{t('requestInfo.weight')}</label>
              }
            >
              <Radio.Group
                name="weight"
                value={object.weight}
                onChange={handleInputChange}
                className="form-element-centered"
              >
                <Radio.Button value="-5 kg" style={{ background: '#F8F9FE' }}>
                  {'<'}5 kg
                </Radio.Button>
                <Radio.Button value="5-20 kg" style={{ background: '#F8F9FE' }}>
                  5-20 kg
                </Radio.Button>
                <Radio.Button value="+20 kg" style={{ background: '#F8F9FE' }}>
                  +20 kg
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={
                <label className="font-bold">
                  {t('requestInfo.uploadImages')}
                </label>
              }
            >
              <UploadImage />
            </Form.Item>
          </Form>
        </div>
        {/* TODO Mischa: Reserve space for Back/Next buttons in general container
          & move buttons out of div, for responsive scrolling! */}
        <div className="form-button-container">
          <BackButton />
          <NextButton nextScreen={NEXT_SCREEN} />
        </div>
      </div>
    </PageLayout>
  );
};

export default EnterObjInfo;
