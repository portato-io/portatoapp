import React from 'react';
import { TFunction } from 'i18next'; // If you are using i18next for t function
import { useEffect, useState } from 'react';
interface SmsSentStepProps {
  onResendSms: () => Promise<void>; // Assuming onSendSMS is an async function without parameters
  onVerifyOtp: () => Promise<void>; // Similarly, assuming onVerifyOtp is an async function without parameters
  setotp: React.Dispatch<React.SetStateAction<string>>; // If setotp is a setState function from useState hook
  t: TFunction; // If you are using the t function from 'react-i18next', otherwise type accordingly
  stepKey: number; // Define the type of stepKey as number
}

const SmsSentStep: React.FC<SmsSentStepProps> = ({
  onResendSms,
  onVerifyOtp,
  setotp,
  t,
  stepKey, // Use stepKey instead of key to avoid conflict with React's key prop
}) => {
  const [resendTimer, setResendTimer] = useState<number>(5);

  return (
    <>
      <h4 className="title title-h4">{t('signIn.smsConfirmationTitle')}</h4>
      <p className="text">{t('signIn.smsConfirmationText')}</p>
      <div className="section section-form section-bleed">
        <div className="input-wrapper">
          <input
            className="form-input"
            type="number"
            placeholder={t('signIn.placeholderSMS') || 'The SMS code'}
            onChange={(e) => setotp(e.target.value)}
          />
        </div>
        <div className="mod-display-flex mod-flex-space-between">
          <button
            className="button button-solid box-shadow box-radius-default box-shadow-effect"
            onClick={onVerifyOtp}
          >
            {t('signIn.smsConfirmationButton')}
          </button>
        </div>
      </div>
    </>
  );
};

export default SmsSentStep;
