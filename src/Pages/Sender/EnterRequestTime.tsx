import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Form, DatePicker } from 'antd';
import { Selector } from 'antd-mobile';
import { useDispatch, useSelector } from 'react-redux';
import {
  setObjectDateRange,
  setObjectTime,
} from '../../Store/actions/requestActionCreators';
import { getConstants } from '../../constant';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import { IRequestInfo } from '../../type';
import dayjs, { Dayjs } from 'dayjs';

require('../../CSS/Calendar.css');

const { RangePicker } = DatePicker;
const PROGRESS = 60;
const NEXT_SCREEN = '/createSendRequest/enter_request_price';

const EnterTime: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { TIME } = getConstants(t);
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  const [dayTime, setDayTime] = useState([]);
  const [dateTimeSelected, setDateTimeSelected] = useState(Boolean);
  const [dayRange, setDayRange] = useState([]);
  const [dayRangeSelected, setDayRangeSelected] = useState(Boolean);
  const [form] = Form.useForm();

  let defaultDateRange: [Dayjs, Dayjs] | undefined = undefined;

  const defaultSelector: string[] = Object.values(objecInfo.time);

  useEffect(() => {
    if (dayTime && dayTime.length === 0) {
      setDateTimeSelected(false);
    } else setDateTimeSelected(true);
  }, [dayTime]);

  useEffect(() => {
    if (dayRange == null || dayRange.length === 0) {
      console.log(dayRange);
      setDayRangeSelected(false);
    } else setDayRangeSelected(true);
  }, [dayRange]);

  useEffect(() => {
    console.log('default', defaultSelector, objecInfo.dateRange);

    if (defaultSelector.length === 0) {
      setDateTimeSelected(false);
    } else setDateTimeSelected(true);

    if (objecInfo.dateRange[0] !== '' && objecInfo.dateRange[1] !== '') {
      defaultDateRange = [
        dayjs(objecInfo.dateRange[0], 'YYYY-MM-DD'),
        dayjs(objecInfo.dateRange[1], 'YYYY-MM-DD'),
      ];
      setDayRangeSelected(true);
    } else {
      setDayRangeSelected(false);
    }
    console.log(defaultDateRange);
  }, []);

  const dispatch = useDispatch();

  const handleTimeChange = (e: any) => {
    setDayTime(e);
    dispatch(setObjectTime(e));
  };

  const handleChangeRange = (range: any) => {
    console.log(range);
    setDayRange(range);
    if (range) {
      const start = range[0].format().substring(0, 10);
      const end = range[1].format().substring(0, 10);

      //values contains a timestamp, that's why we take the first 10 characters
      console.log('start date', start);
      console.log('end date', end);
      dispatch(setObjectDateRange([start, end]));
    }
  };

  const disabledDate = (current: Dayjs) => {
    // Disable dates before today (including today)
    return current.isBefore(dayjs(), 'day');
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <h2>{t('requestTime.title')}</h2>
          <Form.Item
            name="test"
            className="input-wrapper"
            label={t('requestTime.dates')}
          >
            <RangePicker
              name="time"
              inputReadOnly={true}
              onChange={handleChangeRange}
              style={{ width: '100%' }}
              defaultValue={
                objecInfo.dateRange[0] && objecInfo.dateRange[1]
                  ? [
                      dayjs(objecInfo.dateRange[0], 'YYYY-MM-DD'),
                      dayjs(objecInfo.dateRange[1], 'YYYY-MM-DD'),
                    ]
                  : undefined
              }
              disabledDate={disabledDate}
            />

            <small>{t('requestTime.dateHint')}</small>
          </Form.Item>

          <Form.Item className="input-wrapper" label={t('requestTime.times')}>
            <small>{t('requestTime.timeHint')}</small>
            <Selector
              options={TIME}
              multiple={true}
              onChange={handleTimeChange}
              defaultValue={defaultSelector}
            />
          </Form.Item>
        </Form>

        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'send_4_time_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_4_time_next_button_click');
            }}
            disabled={!dateTimeSelected || !dayRangeSelected}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterTime;
