import React from 'react';
import { TFunction } from 'i18next'; // If you are using i18next for t function
import { useEffect, useState } from 'react';
interface SmsSentStepProps {
  onSendSMS: () => Promise<void>; // Assuming onSendSMS is an async function without parameters
  onVerifyOtp: () => Promise<void>; // Similarly, assuming onVerifyOtp is an async function without parameters
  setotp: React.Dispatch<React.SetStateAction<string>>; // If setotp is a setState function from useState hook
  t: TFunction; // If you are using the t function from 'react-i18next', otherwise type accordingly
}

const SmsSentStep: React.FC<SmsSentStepProps> = ({
  onSendSMS,
  onVerifyOtp,
  setotp,
  t,
}) => {
  const [resendTimer, setResendTimer] = useState<number>(5);

  useEffect(() => {
    // Start the countdown immediately on component mount
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only on mount

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
          <p className="text-note mod-nomargin-top">
            {resendTimer > 0 ? (
              <span>Resend available in {resendTimer}s</span>
            ) : (
              <a className="text-link" onClick={onSendSMS}>
                {t('signIn.smsConfirmationResend')}
              </a>
            )}
          </p>
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
