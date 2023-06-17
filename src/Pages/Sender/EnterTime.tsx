import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, DatePicker } from 'antd';
import { Selector } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import {
  setObjectDateRange,
  setObjectTime,
} from '../../Store/actions/requestActionCreators';
import { TIME } from '../../constant';

//import DatePicker from "react-datepicker"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const PROGRESS = 50;
const NEXT_SCREEN = '/createSendRequest/enter_price';

const EnterTime: React.FC = () => {
  const dispatch = useDispatch();

  const handleTimeChange = (e: any) => {
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
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Title level={3}>When?</Title>
            <Form.Item
              label={<label className="font-bold">Dates</label>}
              style={{}}
            >
              <RangePicker
                name="time"
                inputReadOnly={true}
                onChange={handleChangeRange}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item label={<label className="font-bold">Time</label>}>
              <Selector
                className="form-element-centered"
                options={TIME}
                multiple={true}
                onChange={handleTimeChange}
              />
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

export default EnterTime;
