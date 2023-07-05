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
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item className="input-wrapper">
            <label> {t('requestAddresses.pickupAddress')}</label>
            <AddressAutocomplete
              type={'pickup'}
              savedAddress={objecInfo.pickup_adress}
            />
          </Form.Item>

          <Form.Item className="input-wrapper">
            {/* <Input
              name="delivery_adress"
              value={adresses.delivery_adress}
              onChange={handleInputChange}
              prefix={<SearchOutlined />}
              style={{ background: '', width: '90%' }}
            /> */}
            <label> {t('requestAddresses.deliveryAddress')}</label>
            <AddressAutocomplete
              type={'delivery'}
              savedAddress={objecInfo.delivery_adress}
            />
          </Form.Item>
        </Form>
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'send_2_address_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_2_address_next_button_click');
            }}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterAddress;
