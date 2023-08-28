import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-9.png';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import { Link } from 'react-router-dom';

require('../CSS/InfoPages.css');

const Home: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string

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
        <div className="info-page-top-spacer"></div>
      </section>

      <section className="section">
        <h2>{t('imprint.title')}</h2>

        <p>
          {t('imprint.text')
            .split('\n')
            .map((line: string, i: number) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
        </p>
      </section>
    </PageLayout>
  );
};

export default Home;
