import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setObjectPrice } from '../../Store/actions/requestActionCreators';
import { IRequestInfo } from '../../type';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const PROGRESS = 80;
const NEXT_SCREEN = '/createSendRequest/request-summary';

const EnterRequestPrice: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  const [form] = Form.useForm();
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleFormChange = () => {
    const formValues = form.getFieldsValue();
    const isFilled = Object.values(formValues).every((value) => !!value);
    setIsFormFilled(isFilled);
  };
  const initialValues = {
    price: objecInfo.price,
  };

  const [prices, setValues] = useState({
    price: objecInfo.price,
  });
  console.log(prices.price);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setObjectPrice(prices.price));
  }, [prices]);

  const handleInputChange = (e: any) => {
    if (!Number(e.target.value) && e.target.value.length > 0) {
      return;
    }
    setValues({
      ...prices,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    console.log('submitted');
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const greaterThanOneCHFValidator = (_: any, value: any) => {
    const parsedValue = parseFloat(value); // Convert the value to a numeric format
    console.log(parsedValue);
    if (isNaN(parsedValue) || parsedValue <= 1) {
      return Promise.reject('Value must be greater than 1 CHF');
    }
    return Promise.resolve();
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          id="myForm"
          initialValues={initialValues}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          onChange={handleFormChange}
        >
          <h2>{t('requestCost.title')}</h2>
          <Form.Item
            name="price"
            className="input-wrapper"
            label={t('requestCost.label')}
            rules={[
              {
                required: true,
                message: 'Please input the request price',
              },
              {
                validator: greaterThanOneCHFValidator, // Use the custom validator
              },
            ]}
          >
            <Input
              name="price"
              value={objecInfo.price !== 0 ? objecInfo.price : undefined}
              onChange={handleInputChange}
              placeholder={t('requestCost.pricePlaceholder') || ''}
              suffix="CHF"
            />
          </Form.Item>

          <div className="mod-display-flex box-style-grey box-shadow box-radius-style-2">
            <i className="icon icon-bell"></i>
            <p className="text-hint mod-nomargin-top">
              {t('requestCost.comment')}
            </p>
          </div>
        </Form>
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'send_4_price_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'send_4_price_next_button_click');
            }}
            disabled={!isFormFilled}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterRequestPrice;
