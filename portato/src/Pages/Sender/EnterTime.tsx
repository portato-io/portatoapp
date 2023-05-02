import React, { useState } from "react";
import PageLayout from "../Layouts/PageLayoutTest";
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import ProgressBar from "../../Components/ProgressBar";
import { Typography, Form, DatePicker, Radio, Checkbox, Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { IObjectInfo, ObjectInfoState } from "../../type";
import { useDispatch, useSelector } from "react-redux";
import { setObjectDateRange, setObjectTime } from "../../Store/actionCreators";
import { CheckboxValueType } from "antd/es/checkbox/Group";

//import DatePicker from "react-datepicker"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const plainOptions = ["Morning ", "Mid days ", "Evenings "];
const CheckboxGroup = Checkbox.Group;
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
const progress = 50;

const EnterTime: React.FC = () => {
  const nextScreen = "/createSendRequest/enter_price";

  const objecInfo = useSelector((state: ObjectInfoState) => state.object);

  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    dispatch(setObjectTime(e));
  };

  const handleChangeRange = (range: any) => {
    const start = range[0].format().substring(0, 10);
    const end = range[1].format().substring(0, 10);

    //values contains a timestamp, that's why we take the first 10 characters
    console.log("start date", start);
    console.log("end date", end);
    dispatch(setObjectDateRange([start, end]));
  };

  return (
    <PageLayout>
      <ProgressBar progress={progress} />

      <Form
        className="form-sender"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Title level={3} style={{ background: "#fff" }}>
          {" "}
          When?
        </Title>
        <Form.Item
          label={<label className="item-form-label">Dates</label>}
          style={{}}
        >
          <RangePicker name="time" onChange={handleChangeRange} />
        </Form.Item>

        <Form.Item label={<label className="item-form-label">Time</label>}>
          <CheckboxGroup
            name="time"
            onChange={handleInputChange}
            options={plainOptions}
          />
        </Form.Item>
        <NextButton nextScreen={nextScreen} />
      </Form>

      <NextButton nextScreen={nextScreen} />
      <BackButton />
    </PageLayout>
  );
};

export default EnterTime;
