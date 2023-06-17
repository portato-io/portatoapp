import React, { useContext, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IRouteInfo } from '../../type';
import { setDetour, setRoute } from '../../Store/actions/routeActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'antd-mobile';
import AddressAutocomplete from '../../Components/AutoComplete';
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const PROGRESS = 0;
const NEXT_SCREEN = '/deliver/enterDrivingTime';
const MARKS = {
  0: '0 km',
  5: '5 km',
  10: '10 km',
  20: '20 km',
  50: '50 km',
  100: '100 km',
};

const EnterRoute: React.FC = () => {
  const { t } = useContext(TranslationContext);
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);

  const [routes, setValues] = useState({
    departure_adress: routeInfo.departure_adress,
    destination_adress: routeInfo.destination_adress,
    acceptable_detour: routeInfo.acceptable_detour,
  });

  React.useEffect(() => {
    dispatch(setRoute(routes.departure_adress, routes.destination_adress));
    dispatch(setDetour(routes.acceptable_detour));
  }, [routes]);

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    if (typeof e == 'number') {
      setValues({
        ...routes,
        acceptable_detour: e,
      });
    } else {
      setValues({
        ...routes,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={4} style={{ backgroundColor: 'white' }}>
              Departure
            </Title>
            <Form.Item>
              <AddressAutocomplete
                type={'departure'}
                savedAddress={routeInfo.departure_adress}
              />
            </Form.Item>

            <Title level={4} style={{ backgroundColor: 'white' }}>
              Destination
            </Title>
            <Form.Item>
              <AddressAutocomplete
                type={'destination'}
                savedAddress={routeInfo.destination_adress}
              />
            </Form.Item>
            <Title level={4} style={{ backgroundColor: 'white' }}>
              Acceptable detour
            </Title>
            <Slider
              marks={MARKS}
              ticks
              value={routes.acceptable_detour}
              onChange={handleInputChange}
              style={{ marginLeft: '-3vw', width: '90vw' }}
            />
          </Form>
        </div>
        <div className="form-button-container">
          <BackButton />
          <NextButton nextScreen={NEXT_SCREEN} />
        </div>
      </div>
    </PageLayout>
  );
};

export default EnterRoute;
