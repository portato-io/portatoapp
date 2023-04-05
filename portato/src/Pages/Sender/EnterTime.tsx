import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
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

const EnterTime: React.FC = () => {
    const nextScreen = "/enter_price"
    return (
        <PageLayout>
            <Form
            className="form-sender"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            >
                <Form.Item label = "Dates">
                    <RangePicker />
                </Form.Item>

                <Form.Item label = "Time">
                    <CheckboxGroup options={plainOptions} style = {{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}/>
                </Form.Item>
                <NextButton nextScreen = {nextScreen}/>
            </Form>

            <NextButton nextScreen = {nextScreen}/>
            <BackButton/>
        </PageLayout>
  );
};

export default EnterTime;
