import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-12.png';
import sendImage from '../Assets/Images/send.png';
import driveImage from '../Assets/Images/drive.png';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import LottieAnimation from '../Assets/Lotties/how-it-works-animation';
import ConradImage from '../Assets/Images/team/conrad.jpg';
import HugoImage from '../Assets/Images/team/hugo.jpg';
import MehdiImage from '../Assets/Images/team/mehdi.jpg';
import MischaImage from '../Assets/Images/team/mischa.jpg';
import ChiaraImage from '../Assets/Images/team/chiara.jpg';
import { Link } from 'react-router-dom';

interface Images {
  [key: string]: string;
}

const teamMemberImages: Images = {
  Conrad: ConradImage,
  Hugo: HugoImage,
  Mehdi: MehdiImage,
  Mischa: MischaImage,
  Chiara: ChiaraImage,
};

require('../CSS/Home.css');

const Home: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const teamMemberNames = ['Conrad', 'Mischa', 'Chiara', 'Hugo', 'Mehdi'];

  function getTeamMemberImage(memberName: string): string {
    return (
      teamMemberImages[memberName] ||
      'https://images.app.goo.gl/g1PsaaVtxwriDuqVA'
    ); // Use placeholder image if image is not found
  }

  const TeamMember: React.FC<{ memberName: string }> = ({ memberName }) => {
    const name = t(`team.${memberName}.name`);
    const description = t(`team.${memberName}.description`);
    const image = getTeamMemberImage(memberName);

    return (
      <div className="listing-entry">
        <div className="listing-entry-header">
          <img className="image circle" src={image} />
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

  /* SOCIALS ------------------------------------------------------ */
  const socialChannelTypes = ['linkedin', 'instagram'];
  const SocialChannel: React.FC<{ socialLabel: string }> = ({
    socialLabel,
  }) => {
    const label = t(`social.${socialLabel}.label`);
    const link = t(`social.${socialLabel}.link`);
    const icon = 'icon ' + t(`social.${socialLabel}.icon`);
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      logEvent(analytics, `home_${socialLabel}_button_click`);
      window.open(link, '_blank');
    };

    return (
      <a
        href={link}
        className="button button-border box-shadow box-radius-default box-shadow-effect"
        target="_blank"
        onClick={handleClick}
      >
        <i className={icon} />
        <span>{label}</span>
      </a>
    );
  };

  return (
    <PageLayout>
      {/* Landing screen */}
      {/* <section className="section mod-nopadding mod-nomargin-top mod-relative mod-display-inline-block">
        <img
          src={headerImage}
          alt="portato header image"
          className="image header-image"
        />
        <div className="overlay-text">Your Overlay Text Here</div>
      </section> */}

      <section className="header-section">
        <img
          src={headerImage}
          alt="portato header image"
          className="header-image"
        />
        <div className="header-overlay-text">{t('general.tagline')}</div>
      </section>

      {/* 
      <section className="section">
        <div className="spacer-xxl"></div>
        <div className="text-section">
          <h1 className="icon icon-logo icon-big logo-slogan">portato</h1>
          
        </div>
      </section> */}

      {/* <section className="section custom-section mod-relative">
        <div className="background-container">
            <div className="color-fill"></div>
            <div className="image-container">
                <img src={sendImage} alt="Send Image" className="section-image"/>
            </div>
        </div>
        <h2 className="section-title">Your Title Here</h2>
        <p className="section-text">Your description or regular text goes here.</p>
        <button className="section-button">Button Text</button>
    </section> */}

      <section className="section custom-section mod-relative">
        <h2 className="mod-text-align-center">Your Title Here</h2>
        <p className="mod-text-align-center">
          Your description or regular text goes here. Add as much content as you
          need, and the section will grow accordingly.
        </p>
        <img
          src={sendImage}
          alt="send image"
          className="call-to-action-image"
        />
      </section>

      {/* 
    <section className="section custom-section mod-relative">
      <div className="image-container">
          <img src={sendImage} alt="Send Image" className="section-image"/>
      </div>
      <h2 className="section-title">Your Title Here</h2>
      <p className="section-text">Your description or regular text goes here.</p>
      <button className="section-button">Button Text</button>
    </section> */}

      {/* <section className="section">
      <img src={sendImage} alt="send image" className="header-image" />
      <div className="header-overlay-text">{t('general.tagline')}</div>
    </section> */}

      <section className="section">
        <div className="spacer-xxl"></div>
        <div className="text-section">
          <h1 className="icon icon-logo icon-big logo-slogan">portato</h1>
        </div>
      </section>

      <section className="section ">
        <div className="spacer-regular"></div>
        <div className="mod-display-flex">
          <a
            className="button button-solid box-shadow box-radius-default box-shadow-effect"
            href="/createSendRequest/enter_request_name_desc"
            onClick={() => logEvent(analytics, 'home_send_button_click')}
          >
            {t('general.send')}
          </a>
          <a
            className="button button-solid box-shadow box-radius-default box-shadow-effect"
            href="/deliver/enterRoute"
            onClick={() => logEvent(analytics, 'home_drive_button_click')}
          >
            {t('general.deliver')}
          </a>
        </div>
        <div className="spacer-regular"></div>
      </section>

      <section className="section">
        <h2>{t('general.howItWorks')}</h2>
        <div className="video-wrapper">
          <LottieAnimation />
        </div>
      </section>

      <section className="section mod-text-align-right">
        <h2>{t('about.title')}</h2>
        <section className="section box-style-color box-radius-style-3 mod-text-align-right mod-nomargin-top">
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

      <section className="section">
        <h2>{t('links.heading')}</h2>
        <Link
          to="/FAQ"
          onClick={() => logEvent(analytics, 'home_moreInfo_FAQ_button_click')}
        >
          <p>{t('links.FAQ')}</p>
        </Link>

        <Link
          to="/termsAndconditions"
          onClick={() =>
            logEvent(analytics, 'home_moreInfo_TandC_button_click')
          }
        >
          <p>{t('links.termsAndConditions')}</p>
        </Link>

        <Link
          to="/privacyPolicy"
          onClick={() =>
            logEvent(analytics, 'home_moreInfo_privacyPolicy_button_click')
          }
        >
          <p>{t('links.privacyPolicy')}</p>
        </Link>

        <Link
          to="/imprint"
          onClick={() =>
            logEvent(analytics, 'home_moreInfo_imprint_button_click')
          }
        >
          <p>{t('links.imprint')}</p>
        </Link>
      </section>
    </PageLayout>
  );
};

export default Home;
