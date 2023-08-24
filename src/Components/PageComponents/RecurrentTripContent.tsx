import React, { useContext, useState } from 'react';
import { Typography } from 'antd';
import { Selector } from 'antd-mobile';
import { getConstants } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  setDays,
  setTime,
  setType,
} from '../../Store/actions/routeActionCreators';
import { useTranslation } from 'react-i18next';
import { IRouteInfo } from '../../type';
import BackButton from '../Buttons/BackButton';
import NextButton from '../Buttons/NextButton';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const NEXT_SCREEN = '/deliver/enterDeliveryCapacity';

function RecurrentTripContent(activeTab: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);

  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  const dispatch = useDispatch();
  const [dayTime, setDayTime] = useState([]);
  const [dayTimeSelected, setDayTimeSelected] = useState(Boolean);
  const [day, setDay] = useState([]);
  const [daySelected, setDaySelected] = useState(Boolean);
  const defaultDay: string[] = routeInfo.days
    ? Object.values(routeInfo.days)
    : [];
  const defaultDayTime: string[] = routeInfo.time
    ? Object.values(routeInfo.time)
    : [];

  useEffect(() => {
    if (dayTime && dayTime.length === 0) {
      setDayTimeSelected(false);
    } else setDayTimeSelected(true);
    console.log(dayTimeSelected);
  }, [dayTime]);

  useEffect(() => {
    console.log(day);
    if (day && day.length === 0) {
      setDaySelected(false);
    } else setDaySelected(true);
  }, [day]);

  useEffect(() => {
    if (defaultDay.length === 0) {
      setDaySelected(false);
    } else setDaySelected(true);
    if (defaultDayTime.length === 0) {
      setDayTimeSelected(false);
    } else setDayTimeSelected(true);
  }, []);

  useEffect(() => {
    dispatch(setType(Object.values(activeTab)[0] as string));

    return () => {
      // do nothing
    };
  }, [activeTab]);

  const handleDaysChange = (e: any) => {
    console.log(e.length);
    setDay(e);
    dispatch(setDays(e));
  };
  const handleTimeChange = (e: any) => {
    setDayTime(e);
    dispatch(setTime(e));
  };

  return (
    <div>
      <div className="spacer-regular"></div>
      <div className="input-wrapper">
        <label>{t('driveTime.weekdayTitle')}</label>
        <small>{t('driveTime.timeHint')}</small>
        <Selector
          columns={4}
          options={DAYS}
          multiple={true}
          onChange={handleDaysChange}
          defaultValue={routeInfo.days}
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
          disabled={!daySelected || !dayTimeSelected}
        />
      </div>
    </div>
  );
}
export default RecurrentTripContent;
