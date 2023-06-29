import React, { useContext } from 'react';
import { Form, Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Selector } from 'antd-mobile';
import { setCap } from '../../Store/actions/routeActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { CAPACITY_OPTIONS } from '../../constant';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import CustomSelector from '../../Components/CustomSelector';
import { UserOutlined } from '@ant-design/icons';
import { IRouteInfo } from '../../type';

const { Title } = Typography;
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
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const handleCapChange = (e: any) => {
    dispatch(setCap(e));
  };
  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Title level={4}>{t('driveCapacity.title')}</Title>

          <Selector
            columns={1}
            options={CAPACITY_OPTIONS}
            defaultValue={[routeInfo.delivery_capacity[0]]}
            onChange={handleCapChange}
            className="form-element-centered"
            style={{ marginTop: '20px' }}
          />
        </Form>
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'drive_4_next_to_summary_clicked');
            }}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterDeliveryCapacity;
