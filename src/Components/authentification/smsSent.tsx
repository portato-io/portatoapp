import React, { useState } from 'react';
import { TFunction } from 'i18next';

interface SmsSentStepProps {
  onResendSms: () => Promise<void>;
  onVerifyOtp: () => Promise<void>;
  setotp: React.Dispatch<React.SetStateAction<string>>;
  t: TFunction;
  stepKey: number;
}

const SmsSentStep: React.FC<SmsSentStepProps> = ({
  onResendSms,
  onVerifyOtp,
  setotp,
  t,
  stepKey,
}) => {
  const spinnerUrl = '/loading-spinner.png'; // Update with the actual path

  const [loading, setLoading] = useState<boolean>(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await onVerifyOtp();
    } catch (error) {
      console.error('OTP Verification Error:', error);
    }
    setLoading(false);
  };

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
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? t('signIn.loading') : t('signIn.smsConfirmationButton')}
          </button>
        </div>
      </div>
    </>
  );
};

export default SmsSentStep;
