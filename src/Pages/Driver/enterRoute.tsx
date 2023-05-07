import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IObjectInfo } from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import { setObjectAdress } from '../../Store/actionCreators';

const { Title } = Typography;
const progress = 25;

const EnterRoute: React.FC = () => {
  const nextScreen = '/enter_time';

  //   const objecInfo = useSelector((state: IObjectInfo) => state);
  //   console.log(objecInfo.pickup_adress);
  //   const [route, setValues] = useState({
  //     pickup_adress: objecInfo.pickup_adress,
  //     delivery_adress: objecInfo.delivery_adress,
  //   });
  //   React.useEffect(() => {
  //     dispatch(setObjectAdress(adresses.pickup_adress, adresses.delivery_adress));
  //   }, [adresses]);
  const dispatch = useDispatch();
  //   const handleInputChange = (e: any) => {
  //     setValues({
  //       ...adresses,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  return (
    <PageLayout>
      <ProgressBar progress={progress} />
      <Form
        className="form-sender"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Title level={4} style={{ backgroundColor: 'white' }}>
          Departure
        </Title>
        <Form.Item>
          <Input
            name="pickup_adress"
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
            prefix={<SearchOutlined />}
            style={{ background: '', width: '90%' }}
          />
        </Form.Item>
      </Form>

      <NextButton nextScreen={nextScreen} />
      <BackButton />
    </PageLayout>
  );
};

export default EnterRoute;
