import React,{Component, useState} from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import ProgressBar from "../../Components/ProgressBar";
import { Typography, Form, DatePicker, Upload, Input, Radio} from 'antd';
import {PlusOutlined} from "@ant-design/icons"
import {useDispatch} from 'react-redux'

//TMP

import { Button } from "antd";
import { setObject } from "../../Store/actionCreators";
import {IObjectInfo} from "../../type"


const { Title } = Typography;
const { TextArea } = Input;
//type IObjectInfo = typeof IObjectInfo



const EnterObjInfo: React.FC = () => {

  const [values, setValues] = useState({
    name: 'Product A',
    description: 'A very cool product',
    size: '10',
    weight: 2.5,
  });


  React.useEffect(() => {
    dispatch(setObject(values))
  }, [values]);

  const nextScreen = "/enter_address";

  const onFinish = (values:any) =>{
    console.log({values})
  }

  const dispatch = useDispatch();

  const submitForm = (e:any) => {
    e.preventDefault();
    // dispatch FORM_SUBMIT action
  };

  const handleInputChange = (e:any) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value
    }
    );

  };

  return (
    <PageLayout>
        <ProgressBar />
        <Form
          id="sender-forms"
          onFinish={onFinish}
          className="form-sender"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Title level = {3} style={{background: "#fff"}}> What would you like to ship?</Title>
          <Form.Item
            label={<label className="item-form-label">Name</label>}
            name="name"
            //rules={[{ required: true, message: 'Please input your username!' }]}
          >
              <Input
              value={values.name}
              onChange={handleInputChange}
              placeholder="The title of your shipment" style={{width:'90%'}}/>
          </Form.Item>

          <Form.Item
            label={<label className="item-form-label">Description</label>}
            name="description"
            //rules={[{ required: true, message: 'Please input description!' }]}
          >
            <TextArea
            value={values.description}
            onChange={handleInputChange}
            rows={3} placeholder="eg: It’s a good idea to specify the dimensions of large items."  style={{width:'90%'}} />

          </Form.Item>

          <Form.Item
            label={<label className="item-form-label">Size</label>}
          >
          <Radio.Group  style={{marginLeft:'18%'}}>
            <Radio value={1}>S</Radio>
            <Radio value={2}>M</Radio>
            <Radio value={3}>L</Radio>
            <Radio value={4}>XL</Radio>
          </Radio.Group>

          </Form.Item>

          <Form.Item label={<label className="item-form-label">Weight</label>} >

          <Radio.Group style={{marginLeft:'15%'}}>
            <Radio.Button value="small" style={{background:'#F8F9FE'}}>-5 kg</Radio.Button>
            <Radio.Button value="medium" style={{background:'#F8F9FE'}}>5-20 kg</Radio.Button>
            <Radio.Button value="heavy" style={{background:'#F8F9FE'}}>+20 kg</Radio.Button>
          </Radio.Group>

          </Form.Item>


          <Form.Item label = {<label className="item-form-label">Upload images</label>} valuePropName="fileList" >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 2 }}>Image</div>
              </div>
            </Upload>
          </Form.Item>
          <Button  style = {{position: 'absolute',top:'5%'}} htmlType="submit"> test</Button>
          <NextButton nextScreen = {nextScreen}/>
          <BackButton/>
        </Form>

    </PageLayout>

  );

};

export default EnterObjInfo;
