import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NavigationButtons from '../../Components/Buttons/NavigationButtons';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IRequestInfo } from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import { setObjectAdress } from '../../Store/actions/requestActionCreators';

const { Title } = Typography;
const progress = 25;
const NEXT_SCREEN = '/createSendRequest/enter_time';

const EnterAddress: React.FC = () => {
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

  const [adresses, setValues] = useState({
    pickup_adress: objecInfo.pickup_adress,
    delivery_adress: objecInfo.delivery_adress,
  });

  React.useEffect(() => {
    dispatch(setObjectAdress(adresses.pickup_adress, adresses.delivery_adress));
  }, [adresses]);

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    setValues({
      ...adresses,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageLayout>
      <ProgressBar progress={progress} />
      <Form
        className="form-no-scrolling-sender"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          display: 'flex', // make this a flex container
          flexDirection: 'column', // align children vertically
          height: '100vh', // take up full height
          justifyContent: 'space-between', // push content to the top and bottom
          overflow: 'auto', // enable scrolling when content overflows
          paddingBottom: '15vh', // add bottom padding to raise the navigation buttons
        }}
      >
        <div>
          <Title level={4} style={{ backgroundColor: 'white' }}>
            Pick-up address
          </Title>
          <Form.Item>
            <Input
              name="pickup_adress"
              value={
                adresses.pickup_adress !== ''
                  ? adresses.pickup_adress
                  : undefined
              }
              onChange={handleInputChange}
              prefix={<SearchOutlined />}
              style={{ background: '', width: '90%' }}
            />
          </Form.Item>

          <Title level={4} style={{ backgroundColor: 'white' }}>
            Delivery address
          </Title>
          <Form.Item>
            <Input
              name="delivery_adress"
              value={adresses.delivery_adress}
              onChange={handleInputChange}
              prefix={<SearchOutlined />}
              style={{ background: '', width: '90%' }}
            />
          </Form.Item>
        </div>
        <NavigationButtons nextScreen={NEXT_SCREEN} />
      </Form>
    </PageLayout>
  );
};

export default EnterAddress;
