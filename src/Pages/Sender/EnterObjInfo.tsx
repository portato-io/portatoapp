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

import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

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
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />

        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <h2>{t('requestInfo.title')}</h2>
          <Form.Item
            className="input-wrapper"
            label={t('requestInfo.name')}
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
            className="input-wrapper"
            label={t('requestInfo.description')}

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

          <Form.Item className="input-wrapper" label={t('requestInfo.size')}>
            <Selector
              columns={2}
              options={CAPACITY_OPTIONS}
              onChange={handleCapChange}
              defaultValue={[object.size[0]]}
            />
          </Form.Item>

          <Form.Item className="input-wrapper" label={t('requestInfo.weight')}>
            <Radio.Group
              name="weight"
              value={object.weight}
              onChange={handleInputChange}
            >
              <Radio value="-5 kg">0-5 kg</Radio>
              <Radio value="5-20 kg">5-20 kg</Radio>
              <Radio value="+20 kg">20+ kg</Radio>
            </Radio.Group>
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
          <BackButton />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_2_next_to_route_clicked');
            }}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterObjInfo;
