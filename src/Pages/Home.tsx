import React, { useContext } from 'react';
import { Row, Col, Typography, Card, Space, Avatar } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
import backgroundImg from '../Assets/Images/landing_page_image.png';
import howItWorksImg from '../Assets/Images/how_it_works.gif';
import { TranslationContext } from '../Contexts/TranslationContext';

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
      <section>
        <div>
          <img
            src={backgroundImg}
            alt="Background"
            className="home-main-image"
          />
          <h1>Portato</h1>
          <p>Ride-sharing for things</p>
        </div>
      </section>

      {/* Call to action */}
      <section>
        <div>
          <button
            onClick={() =>
              (window.location.href = '/createSendRequest/enterObjInfo')
            }
          >
            Send something
          </button>
          <button
            onClick={() => (window.location.href = '/deliver/enterRoute')}
          >
            Deliver something
          </button>
        </div>
      </section>

      {/* How it works */}
      <section>
        <Card
          size="small"
          title="How It Works"
          style={{ width: '90vw', margin: 'auto' }}
        >
          <img src={howItWorksImg} alt="Animated GIF" />
        </Card>
      </section>

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
      <div>{/* Add your additional section content here */}</div>

      {/* Remember to close PageLayout */}
    </PageLayout>
  );
};

export default Home;
