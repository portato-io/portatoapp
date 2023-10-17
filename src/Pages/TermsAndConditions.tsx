import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string

  return (
    <PageLayout>
      <section className="section">
        <h1>{t('termsAndConditions.title')}</h1>

        <h4>{t('termsAndConditions.definitionOfTermsTitle')}</h4>
        <p>{t('termsAndConditions.definitionOfTermsText')}</p>

        <h4>{t('termsAndConditions.termsOfUseTitle')}</h4>
        <p>{t('termsAndConditions.termsOfUseText')}</p>

        <h4>{t('termsAndConditions.contractConclusionTitle')}</h4>
        <p>{t('termsAndConditions.contractConclusionText')}</p>

        <h4>{t('termsAndConditions.pricesAndPaymentsTitle')}</h4>
        <p>{t('termsAndConditions.pricesAndPaymentsText')}</p>

        <h4>{t('termsAndConditions.liabilityExclusionTitle')}</h4>
        <p>{t('termsAndConditions.liabilityExclusionText')}</p>

        <h4>{t('termsAndConditions.jurisdictionTitle')}</h4>
        <p>{t('termsAndConditions.jurisdictionText')}</p>
      </section>
    </PageLayout>
  );
};

export default Home;
