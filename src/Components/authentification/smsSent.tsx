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

  useEffect(() => {
    const container = document.getElementById('recaptcha-container');
    if (!container) {
      // Create the container if it's not there
      const newContainer = document.createElement('div');
      newContainer.id = 'recaptcha-container';
      document.body.appendChild(newContainer);
    }

    // Reset the timer to 5 whenever the key prop changes
    setResendTimer(5);

    // Start the countdown
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
      // Remove the reCAPTCHA container element from the DOM
      const reCaptchaEl = document.getElementById('recaptcha-container');
      if (reCaptchaEl) {
        reCaptchaEl.remove();
      }
    };
  }, [stepKey]); // Dependency array includes the key prop

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
              <a className="text-link" onClick={onResendSms}>
                {t('signIn.smsConfirmationResend')}
              </a>
            )}
          </p>

          <div id="recaptcha-container"></div>
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
