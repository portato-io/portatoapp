import React, { useContext } from 'react';
import { Row, Col, Typography, Card, Space, Avatar } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
import backgroundImg from '../Assets/Images/landing_page_image2.png';
import portatoLogo from '../Assets/Images/logo_blue.png';
import howItWorksImg from '../Assets/Images/how_it_works.gif';
import { TranslationContext } from '../Contexts/TranslationContext';
require('../CSS/Home.css');

const { Title } = Typography;

const Home: React.FC = () => {
  const { t } = useContext(TranslationContext);
  const teamMemberNames = ['Conrad', 'Mischa', 'Chiara', 'Hugo', 'Mehdi'];

  function getTeamMemberImage(image: string): string {
    return image || 'https://images.app.goo.gl/g1PsaaVtxwriDuqVA'; // Use placeholder image if URL is not provided
  }

  const TeamMember: React.FC<{ memberName: string }> = ({ memberName }) => {
    const name = t(`team.${memberName}.name`);
    const description = t(`team.${memberName}.description`);
    const image = getTeamMemberImage(t(`team.${memberName}.image`));

    return (
      <Col span={5}>
        <Space
          direction="vertical"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Avatar size={100} src={image} />
          <Title level={5}>{name}</Title>
          <p>{description}</p>
        </Space>
      </Col>
    );
  };

  return (
    <PageLayout>
      {/* Landing screen */}
      <section className="landing-section">
        <div className="landing-main-container">
          <div className="landing-main-labels">
            <div className="landing-portato-logo">
              <img
                src={portatoLogo}
                alt="Portato Icon"
                className="portato-icon"
              ></img>
              <h1 className="font-comfortaa portato-wordmark">portato</h1>
            </div>

            <p className="font-comfortaa portato-tagline">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      <div className="home-main-container">
        {/* Call to action */}
        <section className="cta-section section-container">
          <div className="cta-button-layout">
            <button
              className="cta-button font-comfortaa"
              onClick={() =>
                (window.location.href = '/createSendRequest/enterObjInfo')
              }
            >
              Send something
            </button>
            <button
              className="cta-button font-comfortaa"
              onClick={() => (window.location.href = '/deliver/enterRoute')}
            >
              Deliver something
            </button>
          </div>
        </section>

        {/* How it works */}
        {/* <lottie-player src="../Assets/Lotties/test-animation.json" background="transparent"  speed="1" loop controls autoplay></lottie-player> */}
        {/* <lottie-player src="https://assets9.lottiefiles.com/datafiles/MUp3wlMDGtoK5FK/data.json"  background="transparent"  loop controls autoplay></lottie-player> */}
        {/* <lottie-player src="https://assets9.lottiefiles.com/datafiles/MUp3wlMDGtoK5FK/data.json" background="transparent" loop autoplay></lottie-player> */}
        {/* <lottie-player src="../Assets/Lotties/test-animation.json" background="transparent" loop autoplay></lottie-player> */}
        {/* <lottie-player
          src="https://lottie.host/dd830d03-3456-47ab-a89e-c64105f8ca2e/nGZ4DRarLa.json"
          background="transparent"
          loop
          autoplay
        ></lottie-player> */}

        {/* About us */}
        <section>
          <Card
            size="small"
            title={t('about.title')}
            style={{ width: '90vw', margin: 'auto' }}
          >
            <h3>{t('about.visionMissionTitle')}</h3>
            <p>
              {t('about.visionMissionText')
                .split('\n')
                .map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
            <h3>{t('about.whoWeAreTitle')}</h3>
            <p>
              {t('about.whoWeAreText')
                .split('\n')
                .map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>

            {/* Team members */}

            <Row gutter={[16, 16]} justify="center">
              {teamMemberNames.map((name) => (
                <TeamMember memberName={name} key={name} />
              ))}
            </Row>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default Home;
