import React, { useContext } from 'react';
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
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const TYPE = 'Single Trip';
const { RangePicker } = DatePicker;

function SingleTripContent() {
  const { t } = useContext(TranslationContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setType(TYPE));

    return () => {
      // do nothing
    };
  }, []);

  const handleTimeChange = (e: any) => {
    dispatch(setTime(e));
  };

  const handleChangeRange = (range: any) => {
    const start = range[0].format().substring(0, 10);
    const end = range[1].format().substring(0, 10);

    //values contains a timestamp, that's why we take the first 10 characters
    console.log('start date', start);
    console.log('end date', end);
    dispatch(setRouteDateRange([start, end]));
  };
  return (
    <div>
      <div style={{ marginTop: '5vh', height: '5vh' }}>
        <Title level={5} style={{}}>
          {t('driveTime.rangeTitle')}
        </Title>
        <RangePicker
          name="time"
          inputReadOnly={true}
          onChange={handleChangeRange}
          style={{
            marginTop: '2vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80vw',
            marginLeft: '10vw',
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
          alignItems: 'center',
        }}
        options={TIME}
        multiple={true}
        onChange={handleTimeChange}
      />
    </div>
  );
}
export default SingleTripContent;
