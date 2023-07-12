import React, { useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, DatePicker } from 'antd';
import { Selector } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import {
  setObjectDateRange,
  setObjectTime,
} from '../../Store/actions/requestActionCreators';
import { getConstants } from '../../constant';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
require('../../CSS/Calendar.css');

const { Title } = Typography;
const { RangePicker } = DatePicker;
const PROGRESS = 50;
const NEXT_SCREEN = '/createSendRequest/enter_price';

const EnterTime: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);

  const dispatch = useDispatch();

  const handleTimeChange = (e: any) => {
    dispatch(setObjectTime(e));
  };

  const handleChangeRange = (range: any) => {
    const start = range[0].format().substring(0, 10);
    const end = range[1].format().substring(0, 10);

    //values contains a timestamp, that's why we take the first 10 characters
    console.log('start date', start);
    console.log('end date', end);
    dispatch(setObjectDateRange([start, end]));
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <h2>{t('requestTime.title')}</h2>
          <Form.Item className="input-wrapper" label={t('requestTime.dates')}>
            <RangePicker
              name="time"
              inputReadOnly={true}
              onChange={handleChangeRange}
              style={{ width: '100%' }}
            />
            <small>{t('requestTime.dateHint')}</small>
          </Form.Item>

          <Form.Item className="input-wrapper" label={t('requestTime.times')}>
            <small>{t('requestTime.timeHint')}</small>
            <Selector
              options={TIME}
              multiple={true}
              onChange={handleTimeChange}
            />
          </Form.Item>
        </Form>

        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'send_3_time_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_3_time_next_button_click');
            }}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterTime;
