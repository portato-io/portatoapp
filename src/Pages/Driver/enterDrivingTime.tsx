import React from 'react';
import { Form, Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import SwitchContainer from '../../Components/SwitchContainer';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Tabs, Calendar, Selector } from 'antd-mobile';
import SingleTripContent from '../../Components/PageComponents/SingleTripContent';
import RecurrentTripContent from '../../Components/PageComponents/RecurrentTripContent';

const { Title } = Typography;
const PROGRESS = 33;
const NEXT_SCREEN = '/deliver/enterDeliveryCapacity';

const EnterDeliveryTime: React.FC = () => {
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
            <Title level={4}>When are you driving?</Title>
            <Tabs>
              <Tabs.Tab title="Single trip" key="single">
                <SingleTripContent />
              </Tabs.Tab>
              <Tabs.Tab title="Recurrent" key="recur">
                <RecurrentTripContent />
              </Tabs.Tab>
            </Tabs>
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

export default EnterDeliveryTime;
