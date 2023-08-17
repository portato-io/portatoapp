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
  const { t } = useTranslation<string>(); // Setting the generic type to string
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
        <h2>{t('FAQ.title')}</h2>

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
