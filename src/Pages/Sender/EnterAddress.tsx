import React, { useState, useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IRequestInfo } from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import AddressAutocomplete from '../../Components/AutoComplete';
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const PROGRESS = 25;
const NEXT_SCREEN = '/createSendRequest/enter_time';

const EnterAddress: React.FC = () => {
  const { t } = useContext(TranslationContext);
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
            <Title level={4}>Pick-up address</Title>
            <Form.Item>
              {/* <Input
                name="pickup_adress"
                value={
                  adresses.pickup_adress !== '' ? adresses.pickup_adress : undefined
                }
                onChange={handleInputChange}
                prefix={<SearchOutlined />}
                style={{ background: '', width: '90%' }}
              /> */}
              <AddressAutocomplete type={'pickup'} />
            </Form.Item>
            <Title level={4}>Delivery address</Title>
            <Form.Item>
              {/* <Input
                name="delivery_adress"
                value={adresses.delivery_adress}
                onChange={handleInputChange}
                prefix={<SearchOutlined />}
                style={{ background: '', width: '90%' }}
              /> */}
              <AddressAutocomplete type={'delivery'} />
            </Form.Item>
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

export default EnterAddress;
