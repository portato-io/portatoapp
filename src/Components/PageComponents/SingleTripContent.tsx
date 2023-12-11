import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Selector } from 'antd-mobile';
import { DatePicker } from 'antd';
import { getConstants } from '../../constant';
import { useEffect, useState } from 'react';
import {
  setTime,
  setType,
  setRouteDateRange,
} from '../../Store/actions/routeActionCreators';
import { useTranslation } from 'react-i18next';
import { IRouteInfo } from '../../type';
import BackButton from '../Buttons/BackButton';
import NextButton from '../Buttons/NextButton';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const NEXT_SCREEN = '/deliver/enterDeliveryCapacity';

function SingleTripContent(activeTab: any) {
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);
  const [dayTime, setDayTime] = useState([]);
  const [dayTimeSelected, setDayTimeSelected] = useState(Boolean);
  const [day, setDay] = useState(String);
  const [daySelected, setDaySelected] = useState(Boolean);
  const defaultDayTime: string[] = Object.values(routeInfo.timeRange);

  const dispatch = useDispatch();
  let defaultValue = undefined;
  if (routeInfo.timeRange !== '') {
    defaultValue = dayjs(routeInfo.timeRange, 'YYYY-MM-DD');
  }

  useEffect(() => {
    console.log('ALORS', day);
    if (day != null) {
      setDaySelected(true);
    } else setDaySelected(false);
  }, [day]);

  useEffect(() => {
    console.log(dayTime);
    if (dayTime && dayTime.length === 0) {
      setDayTimeSelected(false);
    } else setDayTimeSelected(true);
  }, [dayTime]);

  useEffect(() => {
    console.log(routeInfo.time);
    if (routeInfo.time.length === 0) {
      setDayTimeSelected(false);
    } else setDayTimeSelected(true);
    console.log('ALed', routeInfo.timeRange);
    if (routeInfo.timeRange == '') {
      setDaySelected(false);
    } else setDaySelected(true);
  }, []);

  useEffect(() => {
    dispatch(setType(Object.values(activeTab)[0] as string));

    return () => {
      // do nothing
    };
  }, [activeTab]);

  const handleTimeChange = (e: any) => {
    setDayTime(e);
    dispatch(setTime(e));
  };

  const handleChangeRange = (date: any) => {
    console.log(date);
    setDay(date);
    if (date) {
      const travelDate = date.format().substring(0, 10);
      dispatch(setRouteDateRange(travelDate));
    }
  };

  return (
    <div>
      <div className="spacer-regular"></div>
      <div className="input-wrapper">
        <label>{t('driveTime.rangeTitle')}</label>
        <DatePicker
          name="time"
          inputReadOnly={true}
          onChange={handleChangeRange}
          defaultValue={defaultValue}
          style={{
            width: '100%',
          }}
        />
      </div>
      <div className="input-wrapper">
        <label>{t('driveTime.timeTitle')}</label>
        <small>{t('driveTime.timeHint')}</small>
        <Selector
          options={TIME}
          multiple={true}
          onChange={handleTimeChange}
          defaultValue={routeInfo.time}
        />
      </div>
      <div className="form-button-container mod-display-flex mod-flex-space-between">
        <BackButton
          onClick={() => {
            logEvent(analytics, 'drive_2_time_back_button_click');
          }}
        />
        <NextButton
          nextScreen={NEXT_SCREEN}
          onClick={() => {
            logEvent(analytics, 'drive_2_time_next_button_click');
          }}
          disabled={!dayTimeSelected || !daySelected}
        />
      </div>
    </div>
  );
}
export default SingleTripContent;
