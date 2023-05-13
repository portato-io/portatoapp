import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { Calendar, Selector } from 'antd-mobile';
import { TIME } from '../../constant';
import { useEffect } from 'react';
import { setTime, setType } from '../../Store/actions/routeActionCreators';

const { Title } = Typography;
const TYPE = 'Single Trip';

function SingleTripContent() {
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
  return (
    <div>
      <div style={{ height: '45vh' }}>
        <Calendar
          className="calendar"
          selectionMode="range"
          onChange={(val) => {
            console.log(val);
          }}
        />
      </div>
      <Title level={5} style={{}}>
        Time
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
