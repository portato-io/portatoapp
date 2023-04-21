import React,{ChangeEvent, useState} from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import ProgressBar from "../../Components/ProgressBar";
import { Typography, Form, Upload, Input, Radio, Progress} from 'antd';
import {PlusOutlined} from "@ant-design/icons"
import {useDispatch,useSelector} from 'react-redux'
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";

//TMP

import { Button } from "antd";
import { setObject } from "../../Store/actionCreators";
import {IFirstObjectInfo, IObjectInfo,ObjectInfoState} from "../../type"


const { Title } = Typography;
const { TextArea } = Input;
//type IObjectInfo = typeof IObjectInfo



const EnterObjInfo: React.FC = () => {

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const beforeUpload = (file: File) => {
    setUploading(true);
    uploadImage(file);
    return false;
  };

  async function uploadImage(file: File) {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error: StorageError) => {
        console.error("Error uploading image:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        setUploading(false);
      }
    );
  }

  const fileRender = () => {
    if (uploading) {
      return (
        <div>
          <Progress type="circle" percent={progress} width={40} />
        </div>
      );
    } else {
      return (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 2 }}>Image</div>
        </div>
      );
    }
  };
  const handleUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      uploadImage(info.file.originFileObj as File);
    } else if (info.file.status === 'error') {
      console.error('Error uploading the file');
    }
  };

  const objecInfo = useSelector((state: IObjectInfo) => state);

  const [object, setValues] = useState<IFirstObjectInfo>(
    {
      name: objecInfo.name,
      description: objecInfo.description,
      size: objecInfo.size,
      weight: objecInfo.weight,
  });


  React.useEffect(() => {
    dispatch(setObject(object))
  }, [object]);

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
      ...object,
      [e.target.name]: e.target.value
    });
    console.log(e.target.name);

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
            //name="name"
            //rules={[{ required: true, message: 'Please input your username!' }]}
          >
              <Input
              name = "name"
              value={object.name}
              onChange={handleInputChange}
              placeholder="The title of your shipment" style={{width:'90%'}}/>
          </Form.Item>

          <Form.Item
            label={<label className="item-form-label">Description</label>}

            //rules={[{ required: true, message: 'Please input description!' }]}
          >
            <TextArea
            name="description"
            value={object.description}
            onChange={handleInputChange}
            rows={3} placeholder="eg: It’s a good idea to specify the dimensions of large items."  style={{width:'90%'}} />

          </Form.Item>

          <Form.Item
            label={<label className="item-form-label">Size</label>}
          >
          <Radio.Group
          name = "size"
          value = {object.size}
          onChange = {handleInputChange}
          style={{marginLeft:'18%'}}>
            <Radio value={"S"}>S</Radio>
            <Radio value={"M"}>M</Radio>
            <Radio value={"L"}>L</Radio>
            <Radio value={"XL"}>XL</Radio>
          </Radio.Group>

          </Form.Item>

          <Form.Item label={<label className="item-form-label">Weight</label>} >

          <Radio.Group
          name = "weight"
          value = {object.weight}
          onChange = {handleInputChange}
          style={{marginLeft:'15%'}}>
            <Radio.Button value="-5 kg" style={{background:'#F8F9FE'}}>-5 kg</Radio.Button>
            <Radio.Button value="5-20 kg" style={{background:'#F8F9FE'}}>5-20 kg</Radio.Button>
            <Radio.Button value="+20 kg" style={{background:'#F8F9FE'}}>+20 kg</Radio.Button>
          </Radio.Group>

          </Form.Item>


          <Form.Item
        label={<label className="item-form-label">Upload images</label>}
        valuePropName="fileList"
      >
        <Upload
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleUploadChange}
      >
        {fileRender()}
      </Upload>
      </Form.Item>
          <NextButton nextScreen = {nextScreen}/>
          <BackButton/>
        </Form>

    </PageLayout>

  );

};

export default EnterObjInfo;
