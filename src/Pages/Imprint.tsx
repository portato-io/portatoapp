import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string

  return (
    <PageLayout>
      <section className="section">
        <h1>{t('imprint.title')}</h1>

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
