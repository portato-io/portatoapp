import React, { useContext, useState } from 'react';
import { Typography } from 'antd';
import { Selector } from 'antd-mobile';
import { DAYS, TIME } from '../../constant';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setDays,
  setTime,
  setType,
} from '../../Store/actions/routeActionCreators';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const TYPE = 'Recurrent';

function RecurrentTripContent(activeTab: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const dispatch = useDispatch();
  console.log('ACTIVE', Object.values(activeTab));
  useEffect(() => {
    console.log('JESUIS DANS RECURRENT TRIP');
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

  return (
    <div>
      <Title level={5} style={{}}>
        {t('driveTime.weekdayTitle')}
      </Title>
      <Selector
        columns={7}
        options={DAYS}
        multiple={true}
        onChange={handleDaysChange}
      />

      <Title level={5} style={{}}>
        {t('driveTime.timeTitle')}
      </Title>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Selector options={TIME} multiple={true} onChange={handleTimeChange} />
      </div>
    </div>
  );
}
export default RecurrentTripContent;
