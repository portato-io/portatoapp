import React from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import ProgressBar from "../../Components/ProgressBar";
import { Typography, Form, DatePicker, Radio, Checkbox, Calendar} from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
//import DatePicker from "react-datepicker"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const plainOptions = ['Morning', 'Mid day', 'Evenings'];
const CheckboxGroup = Checkbox.Group;
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
const progress = 50;

const EnterTime: React.FC = () => {
    const nextScreen = "/enter_price"
    return (
        <PageLayout>
            <ProgressBar progress = {progress}/>

            <Form
            className="form-sender"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            >
                <Title level = {3} style={{background: "#fff"}}> When?</Title>
                <Form.Item label = {<label className="item-form-label">Dates</label>} style={{}}>
                    <RangePicker />
                </Form.Item>

                <Form.Item label = {<label className="item-form-label">Time</label>}>
                    <CheckboxGroup options={plainOptions} />
                </Form.Item>
                <NextButton nextScreen = {nextScreen}/>
            </Form>

            <NextButton nextScreen = {nextScreen}/>
            <BackButton/>
        </PageLayout>
  );
};

export default EnterTime;
