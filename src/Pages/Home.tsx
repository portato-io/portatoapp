import React, { useContext } from 'react';
import { Row, Col, Typography, Card, Space, Avatar } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-4.png';
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
      <section className="section section-bleed">
        <img
          src={headerImage}
          alt="portato header image"
          className="image header-image"
        />
      </section>

      <section className="section">
        <div className="text-section">
          <h1 className="icon icon-logo icon-big logo-slogan">portato</h1>
          <h3>A easy, cheap and eco-friendly transport service for things.</h3>
        </div>
      </section>

      <section className="section">
        <div className="spacer-regular"></div>
        <div className="mod-display-flex">
          <a
            className="button button-solid button-shadow"
            href="/createSendRequest/enterObjInfo"
          >
            Send
          </a>
          <a
            className="button button-solid button-shadow"
            href="/deliver/enterRoute"
          >
            Deliver
          </a>
        </div>
      </section>

      <section className="section">
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
    </PageLayout>
  );
};

export default Home;
