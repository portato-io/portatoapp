import React, { useState, useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Typography, Form, Input, Card } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setObjectPrice } from '../../Store/actions/requestActionCreators';
import { IRequestInfo, ObjectInfoState } from '../../type';
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const PROGRESS = 75;
const NEXT_SCREEN = '/createSendRequest/summary';

const EnterPrice: React.FC = () => {
  const { t } = useContext(TranslationContext);
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

  const [prices, setValues] = useState({
    price: objecInfo.price,
  });
  console.log(prices.price);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setObjectPrice(prices.price));
  }, [prices]);

  const handleInputChange = (e: any) => {
    setValues({
      ...prices,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };
  // Calculate screen height
  const containerHeight = window.innerHeight * 0.9;
  console.log(containerHeight + 'px');

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
            <Title level={3}>How much is the transport cost for you?</Title>
            <Form.Item
              name={'price'}
              rules={[{ required: true, message: 'please enter a price' }]}
            >
              <Input
                name="price"
                value={objecInfo.price !== 0 ? objecInfo.price : undefined}
                onChange={handleInputChange}
                placeholder="E.g : 30 CHF"
              />
            </Form.Item>
            <Card
              bordered={false}
              className="centered-card"
              style={{ margin: 'auto', width: '80%' }}
            >
              Driver reward: x <br />
              Portato fee: y <br />
              VAT: z <br />
              insurance: xy
            </Card>
            <Form.Item
              style={{
                marginTop: '20px',
              }}
            >
              <Card
                bordered={true}
                style={{
                  background: '#F8F9FE',
                  width: '80%',
                  margin: 'auto',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <InfoCircleOutlined />
                </div>
                Portato factors in the size of the vehicle, distance travelled
                and attractiveness for drivers to deliver it. If your price is
                too low, chances are nobody will take your item.
              </Card>
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

export default EnterPrice;
