import React, { useState, useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import UploadImage from '../../Components/UploadImage';

import { Typography, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setObject } from '../../Store/actions/requestActionCreators';
import { IFirstObjectInfo, IRequestInfo } from '../../type';
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const { TextArea } = Input;
const PROGRESS = 0;

const NEXT_SCREEN = '/createSendRequest/enter_address';

const EnterObjInfo: React.FC = () => {
  const { t } = useContext(TranslationContext);

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

  const [object, setValues] = useState<IFirstObjectInfo>({
    name: objecInfo.name,
    description: objecInfo.description,
    size: objecInfo.size,
    weight: objecInfo.weight,
    matched: objecInfo.matched,
  });
  const [form] = Form.useForm();
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleFormChange = () => {
    const formValues = form.getFieldsValue();
    const isFilled = Object.values(formValues).every((value) => !!value);
    setIsFormFilled(isFilled);
    console.log(isFilled);
  };

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
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            form={form}
            onChange={handleFormChange}
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={3}>What would you like to ship?</Title>
            <Form.Item
              name="name"
              label={<label className="font-bold">Name</label>}
              rules={[{ required: true, message: 'test' }]}
            >
              <Input
                name="name"
                value={object.name}
                onChange={handleInputChange}
                placeholder="The title of your shipment"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={<label className="font-bold">Description</label>}
              rules={[{ required: true }]}
            >
              <TextArea
                name="description"
                value={object.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="eg: It’s a good idea to specify the dimensions of large items."
              />
            </Form.Item>

            <Form.Item
              label={<label className="font-bold">Size</label>}
              rules={[{ required: true }]}
            >
              <Radio.Group
                name="size"
                value={object.size}
                onChange={handleInputChange}
                className="form-element-centered"
              >
                <Radio value={'S'}>S</Radio>
                <Radio value={'M'}>M</Radio>
                <Radio value={'L'}>L</Radio>
                <Radio value={'XL'}>XL</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<label className="font-bold">Weight</label>}
              rules={[{ required: true }]}
            >
              <Radio.Group
                name="weight"
                value={object.weight}
                onChange={handleInputChange}
                className="form-element-centered"
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
            <Form.Item rules={[{ required: true }]}>
              <UploadImage />
            </Form.Item>
          </Form>
        </div>
        {/* TODO Mischa: Reserve space for Back/Next buttons in general container
          & move buttons out of div, for responsive scrolling! */}
        <div className="form-button-container">
          <BackButton />
          <NextButton nextScreen={NEXT_SCREEN} disabled={!isFormFilled} />
        </div>
      </div>
    </PageLayout>
  );
};

export default EnterObjInfo;
