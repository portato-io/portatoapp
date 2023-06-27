import React, { useState, useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IRequestInfo } from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import AddressAutocomplete from '../../Components/AutoComplete';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const { Title } = Typography;
const PROGRESS = 25;
const NEXT_SCREEN = '/createSendRequest/enter_time';

const EnterAddress: React.FC = () => {
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  console.log(objecInfo);
  const { t } = useTranslation<string>(); // Setting the generic type to string
  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={4}> {t('requestAddresses.pickupAddress')}</Title>
            <Form.Item>
              <AddressAutocomplete
                type={'pickup'}
                savedAddress={objecInfo.pickup_adress}
              />
            </Form.Item>
            <Title level={4}>{t('requestAddresses.deliveryAddress')}</Title>
            <Form.Item>
              {/* <Input
            name="delivery_adress"
            value={adresses.delivery_adress}
            onChange={handleInputChange}
            prefix={<SearchOutlined />}
            style={{ background: '', width: '90%' }}
          /> */}
              <AddressAutocomplete
                type={'delivery'}
                savedAddress={objecInfo.delivery_adress}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="form-button-container">
          <BackButton />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_3_next_to_timeframe_clicked');
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default EnterAddress;
