import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Form } from 'antd';
import { IRequestInfo } from '../../type';
import { useSelector } from 'react-redux';
import AddressAutocomplete from '../../Components/AutoComplete';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const PROGRESS = 40;
const NEXT_SCREEN = '/createSendRequest/enter_request_time';

const EnterRequestAddress: React.FC = () => {
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
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
          <h2>{t('requestAddresses.title')}</h2>
          <Form.Item className="input-wrapper">
            <label> {t('requestAddresses.pickupAddress')}</label>
            <AddressAutocomplete
              type={'pickup'}
              savedAddress={objecInfo.pickup_adress}
            />
          </Form.Item>

          <Form.Item className="input-wrapper">
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

export default EnterRequestAddress;
