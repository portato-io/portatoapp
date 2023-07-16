import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import { Selector } from 'antd-mobile';
import { DatePicker } from 'antd';
import { getConstants } from '../../constant';
import { useEffect } from 'react';
import {
  setTime,
  setType,
  setRouteDateRange,
} from '../../Store/actions/routeActionCreators';
import { useTranslation } from 'react-i18next';
import { IRouteInfo } from '../../type';

const { Title } = Typography;
function SingleTripContent(activeTab: any) {
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setType(Object.values(activeTab)[0] as string));

    return () => {
      // do nothing
    };
  }, [activeTab]);

  const handleTimeChange = (e: any) => {
    dispatch(setTime(e));
  };

  const handleChangeRange = (date: any) => {
    const travelDate = date.format().substring(0, 10);
    dispatch(setRouteDateRange(travelDate));
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
    </div>
  );
}
export default SingleTripContent;
