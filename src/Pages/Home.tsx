import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import sendImage from '../Assets/Images/send.webp';
import driveImage from '../Assets/Images/drive.webp';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import LottieAnimation from '../Assets/Lotties/how-it-works-animation';
import ConradImage from '../Assets/Images/team/conrad.webp';
import HugoImage from '../Assets/Images/team/hugo.webp';
import MehdiImage from '../Assets/Images/team/mehdi.webp';
import MischaImage from '../Assets/Images/team/mischa.webp';
import ChiaraImage from '../Assets/Images/team/chiara.webp';
import headerImage from '../Assets/Images/portato-landing-14.svg';
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
      <div className="team-member-entry">
        <img className="image circle team-member-image" src={image} />
        <div className="listing-entry-content">
          <h4 className="">{name}</h4>
          <p className="">
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
        // className="button button-border box-shadow box-radius-default box-shadow-effect"
        className="button button-solid box-shadow box-shadow-effect box-radius-round mod-nomargin-top mod-nomargin-bottom spacing-horizontal-regular"
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
      <section className="section section-bleed box-style-gradient-1 text-align-center mod-nomargin-top section-header-home">
        <section className="section mod-nomargin-top text-color-white">
          <p className="h1 icon icon-logo icon-big logo-slogan">portato</p>
          <h1 className="text-align-center  mod-nomargin-top">
            {t('general.tagline')}
          </h1>

          <img src={headerImage} />
        </section>
      </section>

      <section className="section">
        <div className="spacer-fluid-medium"></div>
        {/* call to action 1 */}
        <div className="box-style-color-3 mod-overflow-hidden">
          <h3>{t('sendSection.title')}</h3>
          <p>{t('sendSection.description')}</p>
          <img
            src={sendImage}
            alt="send image"
            className="image-section-bleed"
          />
        </div>
        <a
          className="button button-solid box-shadow box-shadow-effect box-radius-round mod-nomargin"
          href="/createSendRequest/enter_request_name_desc"
          onClick={() => logEvent(analytics, 'home_send_button_click')}
        >
          {t('general.send')}
        </a>

        <div className="spacer-fluid-small"></div>

        {/* call to action 2 */}
        <div className="box-style-color-3 mod-overflow-hidden">
          <h3>{t('driveSection.title')}</h3>
          <p>{t('driveSection.description')}</p>
          <img
            src={driveImage}
            alt="drive image"
            className="image-section-bleed"
          />
        </div>
        <a
          className="button button-solid box-shadow box-shadow-effect box-radius-round mod-nomargin"
          href="/deliver/enterRoute"
          onClick={() => logEvent(analytics, 'home_drive_button_click')}
        >
          {t('general.deliver')}
        </a>
      </section>

      {/* How it works */}
      <section className="section-bleed box-style-color-1">
        <section className="section text-color-white mod-nomargin-top">
          <h2 className="h1 text-align-center">{t('general.howItWorks')}</h2>
          <div className="video-wrapper">
            <LottieAnimation />
          </div>
        </section>
      </section>

      {/* Portato's mission */}
      <section className="section">
        <h2 className="h1 text-align-center">
          {t('about.visionMissionTitle')}
        </h2>
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
      </section>

      {/* Who we are */}
      <div className="spacer-fluid-medium"></div>
      <section className="section-bleed box-style-color-1">
        <section className="section text-color-white mod-nomargin-top mod-nomargin-bottom">
          <h2 className="h1 text-align-center">{t('about.whoWeAreTitle')}</h2>

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
          <div className="spacer-fluid-medium"></div>
          <div className="listing listing-3 listing-boxes team-member-grid">
            {teamMemberNames.map((name) => (
              <TeamMember memberName={name} key={name} />
            ))}
            <div className="entry-filler"></div>
            <div className="entry-filler"></div>
            <div className="entry-filler"></div>
          </div>
        </section>
      </section>

      {/* Social media */}
      <section className="section">
        <div className="spacer-fluid-regular"></div>
        <h3 className="">{t('social.heading')}</h3>
        <div className="spacer-fluid-regular"></div>
        <div className="mod-display-flex">
          {socialChannelTypes.map((label) => (
            <SocialChannel socialLabel={label} key={label} />
          ))}
        </div>
        <div className="spacer-fluid-medium"></div>
      </section>

      {/* Links */}
      <section className="section-bleed box-style-color-1">
        <section className="section text-color-white">
          <h3>{t('links.heading')}</h3>
          <div className="spacer-fluid-regular"></div>
          <div>
            <Link
              className="mod-display-block text-color-white mod-small-margin-bottom mod-small-margin-top"
              to="/FAQ"
              onClick={() =>
                logEvent(analytics, 'home_moreInfo_FAQ_button_click')
              }
            >
              <small>{t('links.FAQ')}</small>
            </Link>

            <Link
              className="mod-display-block text-color-white mod-small-margin-bottom mod-small-margin-top"
              to="/termsAndconditions"
              onClick={() =>
                logEvent(analytics, 'home_moreInfo_TandC_button_click')
              }
            >
              <small>{t('links.termsAndConditions')}</small>
            </Link>

            <Link
              className="mod-display-block text-color-white mod-small-margin-bottom mod-small-margin-top"
              to="/privacyPolicy"
              onClick={() =>
                logEvent(analytics, 'home_moreInfo_privacyPolicy_button_click')
              }
            >
              <small>{t('links.privacyPolicy')}</small>
            </Link>

            <Link
              className="mod-display-block text-color-white mod-small-margin-bottom mod-small-margin-top"
              to="/imprint"
              onClick={() =>
                logEvent(analytics, 'home_moreInfo_imprint_button_click')
              }
            >
              <small>{t('links.imprint')}</small>
            </Link>
          </div>
        </section>
      </section>
    </PageLayout>
  );
};

export default Home;
