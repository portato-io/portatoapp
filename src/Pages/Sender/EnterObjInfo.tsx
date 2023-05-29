import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NavigationButtons from '../../Components/Buttons/NavigationButtons';
import useScrollable from '../../hooks/useScrollable';
import ProgressBar from '../../Components/ProgressBar';
import UploadImage from '../../Components/UploadImage';

import { Typography, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setObject } from '../../Store/actions/requestActionCreators';
import { IFirstObjectInfo, IRequestInfo } from '../../type';

const { Title } = Typography;
const { TextArea } = Input;

const NEXT_SCREEN = '/createSendRequest/enter_address';

const EnterObjInfo: React.FC = () => {
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  const isScrollable = useScrollable();
  console.log('is scrollable', isScrollable);

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

  // Calculate screen height
  const containerHeight = window.innerHeight * 0.9;
  console.log(containerHeight + 'px');
  const containerMaxHeight = isScrollable ? '70vh' : 'auto'; // if content is scrollable, set a max height, else let it take as much space as it needs

  return (
    <PageLayout>
      <ProgressBar />
      <Form
        id="sender-forms"
        onFinish={onFinish}
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
        <div
          style={{
            marginTop: '5vh',
            overflowY: 'auto', // let the div scroll when content overflows
            flexGrow: 1, // this makes the div take up all available space
            maxHeight: containerMaxHeight, // set max-height to manage overflow
          }}
        >
          <Title level={3} style={{ background: '#fff' }}>
            {' '}
            What would you like to ship?
          </Title>
          <Form.Item
            label={<label className="item-form-label">Name</label>}
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
            label={<label className="item-form-label">Description</label>}

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

          <Form.Item label={<label className="item-form-label">Size</label>}>
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

          <Form.Item label={<label className="item-form-label">Weight</label>}>
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
        </div>
        <NavigationButtons nextScreen={NEXT_SCREEN} scrolling={isScrollable} />
      </Form>
    </PageLayout>
  );
};

export default EnterObjInfo;
