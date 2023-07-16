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

const { Title } = Typography;

function RecurrentTripContent(activeTab: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);

  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setType(Object.values(activeTab)[0] as string));

    return () => {
      // do nothing
    };
  }, [activeTab]);

  const handleDaysChange = (e: any) => {
    dispatch(setDays(e));
  };
  const handleTimeChange = (e: any) => {
    dispatch(setTime(e));
  };
  console.log(routeInfo);
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
    </div>
  );
}
export default RecurrentTripContent;
