import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation<string>();

  return (
    <PageLayout>
      <section className="section">
        <h1>{t('FAQ.title')}</h1>

        <h4>{t('FAQ.senderQuestion')}</h4>
        <p>{t('FAQ.senderAnswer')}</p>

        <h4>{t('FAQ.purchaseQuestion')}</h4>
        <p>{t('FAQ.purchaseAnswer')}</p>

        <h4>{t('FAQ.feeQuestion')}</h4>
        <p>{t('FAQ.feeAnswer')}</p>

        <h4>{t('FAQ.deliveryGuaranteeQuestion')}</h4>
        <p>{t('FAQ.deliveryGuaranteeAnswer')}</p>

        <h4>{t('FAQ.insuranceQuestion')}</h4>
        <p>{t('FAQ.insuranceAnswer')}</p>

        <h4>{t('FAQ.driverQuestion')}</h4>
        <p>{t('FAQ.driverAnswer')}</p>

        <h4>{t('FAQ.paymentQuestion')}</h4>
        <p>{t('FAQ.paymentAnswer')}</p>

        <h4>{t('FAQ.contactQuestion')}</h4>
        <p>{t('FAQ.contactAnswer')}</p>
      </section>
    </PageLayout>
  );
};

export default Home;
