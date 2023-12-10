import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthProvider';
import { message } from 'antd';
import axios from 'axios';

const ContactButton = ({
  requestId = '',
  senderUid = '',
  driverUid = '',
}: any) => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const handleConfirmClick = async () => {
    // Prevent navigation if uid is not defined
    if (!uid) {
      message.error('Please sign in before contact a sender!');
      return;
    }
    const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
    const valuesWithUid = {
      requestId: requestId,
      senderUid: senderUid,
      driverUid: driverUid,
    };

    try {
      const result = await axios.post(
        `https://us-central1-${projectId}.cloudfunctions.net/sendEmailToUid`,
        valuesWithUid
      );

      if (result.status === 200) {
        message.success(t('email.sentSuccessfully'));
      } else {
        message.error(t('email.failedToSend'));
      }
    } catch (error) {
      message.error('Failed to send email. Please try again.');
    }
  };
  const uid = useAuth();
  return (
    <div className="form-button-right">
      <a
        className="button button-solid box-shadow box-radius-default box-shadow-effect ${!uid ? 'disabled' : ''}"
        onClick={handleConfirmClick}
      >
        {t('navigationButton.confirm')}
      </a>
    </div>
  );
};
export default ContactButton;
