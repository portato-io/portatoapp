import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import UploadImage from '../../Components/UploadImage';

import { Typography, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setObject } from '../../Store/actions/requestActionCreators';
import { IFirstObjectInfo, IRequestInfo } from '../../type';

const { Title } = Typography;
const { TextArea } = Input;
const PROGRESS = 0;

const NEXT_SCREEN = '/createSendRequest/enter_address';

const EnterObjInfo: React.FC = () => {
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

  const [object, setValues] = useState<IFirstObjectInfo>({
    name: objecInfo.name,
    description: objecInfo.description,
    size: objecInfo.size,
    weight: objecInfo.weight,
  });

  React.useEffect(() => {
    dispatch(setObject(object));
  }, [object]);

  const onFinish = (values: any) => {
    console.log({ values });
  };

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    setValues({
      ...object,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div className="progress-bar-content-container">
        <Form
          id="sender-forms"
          onFinish={onFinish}
          className="form-sender"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Title level={3} style={{ background: '#fff' }}>
            {' '}
            What would you like to ship?
          </Title>
          <Form.Item
            label={<label className="font-bold">Name</label>}
            //name="name"
            //rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              name="name"
              value={object.name}
              onChange={handleInputChange}
              placeholder="The title of your shipment"
              style={{ width: '90%' }}
            />
          </Form.Item>

          <Form.Item
            label={<label className="font-bold">Description</label>}

            //rules={[{ required: true, message: 'Please input description!' }]}
          >
            <TextArea
              name="description"
              value={object.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="eg: It’s a good idea to specify the dimensions of large items."
              style={{ width: '90%' }}
            />
          </Form.Item>

          <Form.Item label={<label className="font-bold">Size</label>}>
            <Radio.Group
              name="size"
              value={object.size}
              onChange={handleInputChange}
              style={{ marginLeft: '18%' }}
            >
              <Radio value={'S'}>S</Radio>
              <Radio value={'M'}>M</Radio>
              <Radio value={'L'}>L</Radio>
              <Radio value={'XL'}>XL</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={<label className="font-bold">Weight</label>}>
            <Radio.Group
              name="weight"
              value={object.weight}
              onChange={handleInputChange}
              style={{ marginLeft: '15%' }}
            >
              <Radio.Button value="-5 kg" style={{ background: '#F8F9FE' }}>
                -5 kg
              </Radio.Button>
              <Radio.Button value="5-20 kg" style={{ background: '#F8F9FE' }}>
                5-20 kg
              </Radio.Button>
              <Radio.Button value="+20 kg" style={{ background: '#F8F9FE' }}>
                +20 kg
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <UploadImage />
        </Form>
        {/* TODO Mischa: Reserve space for Back/Next buttons in general container
          & move buttons out of div, for responsive scrolling! */}
        <div className="form-button-container">
          <NextButton nextScreen={NEXT_SCREEN} />
          <BackButton />
        </div>
      </div>
    </PageLayout>
  );
};

export default EnterObjInfo;
