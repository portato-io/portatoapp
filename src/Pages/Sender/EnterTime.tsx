import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, DatePicker, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import {
  setObjectDateRange,
  setObjectTime,
} from '../../Store/actions/requestActionCreators';

//import DatePicker from "react-datepicker"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const plainOptions = ['Morning ', 'Mid days ', 'Evenings '];
const CheckboxGroup = Checkbox.Group;
const PROGRESS = 50;
const NEXT_SCREEN = '/createSendRequest/enter_price';

const EnterTime: React.FC = () => {
  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    dispatch(setObjectTime(e));
  };

  const handleChangeRange = (range: any) => {
    const start = range[0].format().substring(0, 10);
    const end = range[1].format().substring(0, 10);

    //values contains a timestamp, that's why we take the first 10 characters
    console.log('start date', start);
    console.log('end date', end);
    dispatch(setObjectDateRange([start, end]));
  };

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />

      <Form
        className="form-no-scrolling-sender"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Title level={3} style={{ background: '#fff' }}>
          {' '}
          When?
        </Title>
        <Form.Item
          label={<label className="item-form-label">Dates</label>}
          style={{}}
        >
          <RangePicker
            name="time"
            inputReadOnly={true}
            onChange={handleChangeRange}
            style={{
              marginTop: '2vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80vw',
            }}
          />
        </Form.Item>

        <Form.Item label={<label className="item-form-label">Time</label>}>
          <CheckboxGroup
            name="time"
            onChange={handleInputChange}
            options={plainOptions}
          />
        </Form.Item>
      </Form>

      <NextButton nextScreen={NEXT_SCREEN} />
      <BackButton />
    </PageLayout>
  );
};

export default EnterTime;
