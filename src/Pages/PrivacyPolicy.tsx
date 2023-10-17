import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation<string>();

  return (
    <PageLayout>
      <section className="section">
        <h1>{t('privacyPolicy.title')}</h1>

        <h4>{t('privacyPolicy.introductionTitle')}</h4>
        <p>{t('privacyPolicy.introductionText')}</p>

        <h4>{t('privacyPolicy.collectionTitle')}</h4>
        <p>
          {t('privacyPolicy.collectionText')
            .split('\n')
            .map((line: string, i: number) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
        </p>

        <h4>{t('privacyPolicy.useTitle')}</h4>
        <p>{t('privacyPolicy.useText')}</p>

        <h4>{t('privacyPolicy.sharingTitle')}</h4>
        <p>{t('privacyPolicy.sharingText')}</p>

        <h4>{t('privacyPolicy.cookiesTitle')}</h4>
        <p>{t('privacyPolicy.cookiesText')}</p>

        <h4>{t('privacyPolicy.rightsTitle')}</h4>
        <p>{t('privacyPolicy.rightsText')}</p>

        <h4>{t('privacyPolicy.updatesTitle')}</h4>
        <p>{t('privacyPolicy.updatesText')}</p>

        <h4>{t('privacyPolicy.contactTitle')}</h4>
        <p>{t('privacyPolicy.contactText')}</p>
      </section>
    </PageLayout>
  );
};

export default Home;
