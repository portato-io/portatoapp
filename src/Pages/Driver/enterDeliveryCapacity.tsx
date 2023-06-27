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
      <ProgressBar progress={PROGRESS} />
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={4}>{t('driveCapacity.title')}</Title>

            <Selector
              columns={1}
              options={CAPACITY_OPTIONS}
              onChange={handleCapChange}
              defaultValue={[routeInfo.delivery_capacity[0]]}
              className="form-element-centered"
              style={{
                marginTop: '20px',
                '--border-radius': '100px',
                '--border': 'solid transparent 1px',
                '--checked-border': 'solid var(--adm-color-primary) 1px',
                '--padding': '8px 24px',
              }}
            />
            {/* <CustomSelector prefixIcons={icons} options={CAPACITY_OPTIONS} /> */}
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

export default EnterDeliveryCapacity;
