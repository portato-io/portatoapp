import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { Calendar, Selector } from 'antd-mobile';
import { DatePicker } from 'antd';
import { TIME } from '../../constant';
import { useEffect } from 'react';
import {
  setTime,
  setType,
  setRouteDateRange,
} from '../../Store/actions/routeActionCreators';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IRouteInfo } from '../../type';

const { Title } = Typography;
const TYPE = 'Single Trip';

function SingleTripContent(activeTab: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string
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
      <div style={{ marginTop: '5vh', height: '5vh' }}>
        <Title level={5} style={{}}>
          {t('driveTime.rangeTitle')}
        </Title>
        <DatePicker
          name="time"
          inputReadOnly={true}
          onChange={handleChangeRange}
          style={{
            width: '100%',
          }}
        />
      </div>
      <Title level={5} style={{ marginTop: '10vh' }}>
        {t('driveTime.timeTitle')}
      </Title>

      <Selector
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        options={TIME}
        multiple={true}
        onChange={handleTimeChange}
      />
    </div>
  );
}
export default SingleTripContent;
