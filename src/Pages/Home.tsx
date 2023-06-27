import React, { useContext } from 'react';
import { Row, Col, Typography, Card, Space, Avatar } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-5.png';
import portatoLogo from '../Assets/Images/logo_blue.png';
import howItWorksImg from '../Assets/Images/how_it_works.gif';
import howItWorksVideo from '../Assets/Videos/video-start-1.mp4';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';

require('../CSS/Home.css');

const { Title } = Typography;

const Home: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const teamMemberNames = ['Conrad', 'Mischa', 'Chiara', 'Hugo', 'Mehdi'];

  function getTeamMemberImage(image: string): string {
    return image || 'https://images.app.goo.gl/g1PsaaVtxwriDuqVA'; // Use placeholder image if URL is not provided
  }

  const TeamMember: React.FC<{ memberName: string }> = ({ memberName }) => {
    const name = t(`team.${memberName}.name`);
    const description = t(`team.${memberName}.description`);
    const image = getTeamMemberImage(t(`team.${memberName}.image`));

    return (
      <div className="listing-entry">
        <div className="listing-entry-header">
          <img className="image box-radius-style-2" src={image} />
          <h4>{name}</h4>
        </div>
        <div className="listing-entry-content">
          <p>
            <small>{description}</small>
          </p>
          <div className="spacer-small"></div>
        </div>
      </div>
    );
  };

  /* SOCIALS - Not working, but i don't know why  */

  const socialChannelTypes = ['linkedin', 'instagram'];
  const SocialChannel: React.FC<{ socialLabel: string }> = ({
    socialLabel,
  }) => {
    const label = t(`social.${socialLabel}.label`);
    const link = t(`social.${socialLabel}.link`);
    const icon = 'icon ' + t(`social.${socialLabel}.icon`);

    return (
      <a
        href={link}
        className="button button-border box-shadow box-radius-default box-shadow-effect"
      >
        <i className={icon} />
        <span>{label}</span>
      </a>
    );
  };

  /*--------------------------------------------------- */

  return (
    <PageLayout>
      {/* Landing screen */}
      <section className="section section-bleed mod-nomargin-top">
        <img
          src={headerImage}
          alt="portato header image"
          className="image header-image"
        />
      </section>

      <section className="section">
        <div className="text-section">
          <h1 className="icon icon-logo icon-big logo-slogan">portato</h1>
          <h5>A easy, cheap and eco-friendly transport service for things.</h5>
        </div>
      </section>

      <section className="section ">
        <div className="spacer-regular"></div>
        <div className="mod-display-flex">
          <a
            className="button button-solid box-shadow box-radius-default box-shadow-effect"
            href="/createSendRequest/enterObjInfo"
            onClick={() => logEvent(analytics, 'send_button_click')}
          >
            {t('general.send')}
          </a>
          <a
            className="button button-solid box-shadow box-radius-default box-shadow-effect"
            href="/deliver/enterRoute"
            onClick={() => logEvent(analytics, 'deliver_button_click')}
          >
            {t('general.deliver')}
          </a>
        </div>
        <div className="spacer-regular"></div>
      </section>

      <section className="section">
        <h2>{t('general.howItWorks')}</h2>
        <div className="video-wrapper">
          <a href="javascript:void(0)" className="video-button-play"></a>
          <video
            className="box-shadow box-radius-style-1"
            muted
            autoPlay
            preload="auto"
          >
            <source src={howItWorksVideo}></source>
          </video>
        </div>
      </section>

      <section className="section mod-text-align-right">
        <h2>{t('about.title')}</h2>
        <section className="section box-style-color box-radius-style-3 box-shadow mod-text-align-right mod-nomargin-top">
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
          <div className="spacer-small"></div>
          {/*
          <div>
            <a
              href="/about-us"
              className="button button-solid box-shadow box-radius-default box-shadow-effect"
            >
              {t('general.moreInfo')}
            </a>
          </div>
          */}
        </section>
      </section>

      <div className="spacer-big"></div>

      <section className="section">
        <h2>{t('about.whoWeAreTitle')}</h2>
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
      </section>

      <section className="section">
        <div className="listing listing-3 listing-boxes">
          {teamMemberNames.map((name) => (
            <TeamMember memberName={name} key={name} />
          ))}
          <div className="entry-filler"></div>
          <div className="entry-filler"></div>
          <div className="entry-filler"></div>
        </div>
      </section>

      <section className="section">
        <h2>{t('social.heading')}</h2>
        <div className="mod-display-flex">
          {socialChannelTypes.map((label) => (
            <SocialChannel socialLabel={label} key={label} />
          ))}
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
    </PageLayout>
  );
};

export default Home;
