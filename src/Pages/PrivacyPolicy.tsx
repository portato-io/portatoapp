import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-9.png';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

require('../CSS/InfoPages.css');

const Home: React.FC = () => {
  const { t } = useTranslation<string>();
  const Spacer = styled.div`
    height: 80px;
  `;

  return (
    <PageLayout>
      <section className="section">
        <div className="white-banner">
          <Link to="/">
            <h2 className="icon icon-logo icon-big logo-slogan fixed-logo">
              portato
            </h2>
          </Link>
        </div>
        <Spacer />
      </section>

      <section className="section">
        <h2>{t('privacyPolicy.title')}</h2>

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
