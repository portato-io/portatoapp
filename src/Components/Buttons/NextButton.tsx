import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';
import { FormInstance } from 'antd/lib/form';

interface NextButtonProps {
  nextScreen?: string;
  disabled?: boolean;
  onClick?: () => void;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  form?: FormInstance;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const NextButton: React.FC<NextButtonProps> = ({
  nextScreen = '/',
  onClick,
  onFinish,
  disabled = false,
  form,
  onFinishFailed,
}) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Error',
      description: 'please complete the fields',
    });
  };

  const handleNextClick = () => {
    console.log(disabled);
    if (!form && disabled) {
      openNotificationWithIcon('error');
      return;
    } // Add this line

    let formValues;
    let formErrors;
    let hasErrors = false;
    if (form) {
      formValues = form.getFieldsValue();
      console.log(formValues);
      formErrors = form.getFieldsError();
      const allFieldsDefined = Object.values(formValues).every(
        (value) => value !== '' && value !== undefined
      );
      for (let i = 0; i < formErrors.length; i++) {
        if (allFieldsDefined && formErrors[i].errors.length === 0) {
          console.log(`No errors for field ${formErrors[i].name}`);
        } else {
          hasErrors = true;
          console.log(
            `Errors found for field ${formErrors[i].name}: ${formErrors[i].errors}`
          );
          if (onFinishFailed) {
            onFinishFailed(formErrors);
            break;
          }
        }
      }
      if (!hasErrors && onFinish) {
        onFinish(formValues);
        navigate(nextScreen);
      }
    } else {
      navigate(nextScreen);
    }

    if (onClick) onClick();
  };

  return (
    <>
      {contextHolder}
      <div className="form-button-right">
        <button
          id="nextButton"
          className="button button-solid box-shadow box-radius-default box-shadow-effect"
          onClick={handleNextClick}
          type="submit"
          form="myForm"
        >
          {t('navigationButton.next')}
        </button>
      </div>
    </>
  );
};

export default NextButton;
