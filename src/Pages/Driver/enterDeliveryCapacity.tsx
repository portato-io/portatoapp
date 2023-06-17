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
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={4}>What is your delivery capacity?</Title>

            <Selector
              columns={1}
              options={CAPACITY_OPTIONS}
              onChange={handleCapChange}
              className="form-element-centered"
              style={{ marginTop: '20px' }}
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

export default EnterDeliveryCapacity;
