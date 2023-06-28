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
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const { Title } = Typography;
const PROGRESS = 75;
const NEXT_SCREEN = '/createSendRequest/summary';

const EnterPrice: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
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
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <h2>{t('requestCost.title')}</h2>
          <Form.Item className="input-wrapper" label={t('requestCost.label')}>
            <Input
              name="price"
              value={objecInfo.price !== 0 ? objecInfo.price : undefined}
              onChange={handleInputChange}
              placeholder={t('requestCost.pricePlaceholder') || ''}
            />
          </Form.Item>
          {/* <Card
              bordered={false}
              className="centered-card"
              style={{ margin: 'auto', width: '80%' }}
            >
              {t('requestCost.driverReward')} a <br />
              {t('requestCost.portatoFee')} b <br />
              {t('requestCost.vat')} c <br />
              {t('requestCost.insurance')} d
            </Card> */}
          <div className="mod-display-flex box-style-grey box-shadow box-radius-style-2">
            <i className="icon icon-bell"></i>
            <p className="text-hint mod-nomargin-top">
              {t('requestCost.comment')}
            </p>
          </div>
        </Form>
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_5_next_to_summary_clicked');
            }}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterPrice;
