import React, { useState, useEffect } from 'react';
import { Form, Select, Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Selector } from 'antd-mobile';
import { setCap } from '../../Store/actions/routeActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { getConstants } from '../../constant';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import CustomSelector from '../../Components/CustomSelector';
import { UserOutlined } from '@ant-design/icons';
import { IRouteInfo } from '../../type';

const NEXT_SCREEN = '/deliver/routeSummary';
const PROGRESS = 66;
// const icons = [
//   <UserOutlined />,
//   <UserOutlined />,
//   <UserOutlined />,
//   <UserOutlined />,
// ];

const EnterDeliveryCapacity: React.FC = () => {
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  const dispatch = useDispatch();
  const [capacity, setCapacity] = useState([]);
  const [capSelected, setCapSelected] = useState(Boolean);
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { DAYS, TIME, CAPACITY_OPTIONS, LANGUAGE_OPTIONS } = getConstants(t);

  useEffect(() => {
    if (capacity && capacity.length !== 0) {
      setCapSelected(true);
    } else setCapSelected(false);
  }, [capacity]);

  useEffect(() => {
    console.log(routeInfo.delivery_capacity);
    if (
      routeInfo.delivery_capacity &&
      routeInfo.delivery_capacity.length !== 0
    ) {
      setCapSelected(true);
    } else setCapSelected(false);
  }, []);
  const handleCapChange = (e: any) => {
    setCapacity(e);
    dispatch(setCap(e));
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <h2>{t('driveCapacity.title')}</h2>

        <Selector
          columns={1}
          options={CAPACITY_OPTIONS}
          defaultValue={[routeInfo.delivery_capacity[0]]}
          onChange={handleCapChange}
          className="form-element-centered"
          style={{ marginTop: '20px' }}
        />

        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'drive_3_capacity_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'drive_3_capacity_next_button_click');
            }}
            disabled={!capSelected}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterDeliveryCapacity;
