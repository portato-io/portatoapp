import React from 'react';
import { Form, Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Selector } from 'antd-mobile';
import { setCap } from '../../Store/actions/routeActionCreators';
import { useDispatch } from 'react-redux';
import { CAPACITY_OPTIONS } from '../../constant';

const { Title } = Typography;
const NEXT_SCREEN = '/deliver/routeSummary';
const PROGRESS = 66;

const EnterDeliveryCapacity: React.FC = () => {
  const dispatch = useDispatch();

  const handleCapChange = (e: any) => {
    dispatch(setCap(e));
  };
  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div className="progress-bar-content-container">
        <Form
          className="form-sender"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Title level={4}>What is your delivery capacity?</Title>
          <div style={{ marginTop: '10vh' }}>
            <Selector
              columns={1}
              options={CAPACITY_OPTIONS}
              onChange={handleCapChange}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </div>
        </Form>
        <div className="form-button-container">
          <NextButton nextScreen={NEXT_SCREEN} />
          <BackButton />
        </div>
      </div>
    </PageLayout>
  );
};

export default EnterDeliveryCapacity;
