import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-11.png';
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
import { Link } from 'react-router-dom';
import leftSlice from '../Assets/Images/portato-landing-11-leftSlice.png';
import rightSlice from '../Assets/Images/portato-landing-11-rightSlice.png';

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
          <h4 className="mod-text-align-center">{name}</h4>
          <p className="mod-text-align-center">
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
        className="button button-solid box-shadow box-shadow-effect box-radius-round"
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
      <section className="header-section">
        <img
          src={headerImage}
          alt="portato header image"
          className="header-image"
        />
        <div className="header-overlay">
          <h1 className="icon icon-logo icon-big logo-slogan logo-slogan-landing-page">
            portato
          </h1>
          <div className="header-overlay-text">{t('general.tagline')}</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section mod-relative">
        <section className="call-to-action-section">
          <h2 className="mod-text-align-center">{t('sendSection.title')}</h2>
          <p className="mod-text-align-center">
            {t('sendSection.description')}
          </p>
          <img
            src={sendImage}
            alt="send image"
            className="call-to-action-image"
          />
        </section>
        <a
          className="button button-solid box-shadow box-shadow-effect call-to-action-button box-radius-round"
          href="/createSendRequest/enter_request_name_desc"
          onClick={() => logEvent(analytics, 'home_send_button_click')}
        >
          {t('general.send')}
        </a>
      </section>

      <div className="spacer-big"></div>

      <section className="section mod-relative">
        <section className="call-to-action-section">
          <h2 className="mod-text-align-center">{t('driveSection.title')}</h2>
          <p className="mod-text-align-center">
            {t('driveSection.description')}
          </p>
          <img
            src={driveImage}
            alt="send image"
            className="call-to-action-image"
          />
        </section>
        <a
          className="button button-solid box-shadow box-shadow-effect call-to-action-button box-radius-round"
          href="/deliver/enterRoute"
          onClick={() => logEvent(analytics, 'home_drive_button_click')}
        >
          {t('general.deliver')}
        </a>
      </section>

      {/* How it works */}
      <div className="spacer-big"></div>
      <section className="section-bleed green-section">
        <section className="section">
          <h1 className="mod-text-align-center">{t('general.howItWorks')}</h1>
          <div className="video-wrapper">
            <LottieAnimation />
          </div>
        </section>
      </section>

      {/* Portato's mission */}
      <section className="section mod-text-align-right">
        <h1 className="mod-text-align-center">
          {t('about.visionMissionTitle')}
        </h1>
        <p className="mod-text-align-center">
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
      <div className="spacer-big"></div>
      <section className="section-bleed green-section">
        <section className="section">
          <h1 className="mod-text-align-center">{t('about.whoWeAreTitle')}</h1>
          <p className="mod-text-align-center">
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

        {/* Team */}
        <section className="section">
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
        <h1 className="mod-text-align-center">{t('social.heading')}</h1>
        <div className="mod-display-flex center-flex">
          {socialChannelTypes.map((label) => (
            <SocialChannel socialLabel={label} key={label} />
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="section-bleed green-section link-section">
        <section className="section">
          <h1 className="mod-text-align-center">{t('links.heading')}</h1>
          <Link
            to="/FAQ"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_FAQ_button_click')
            }
          >
            <p className="mod-text-align-center link-section-text">
              {t('links.FAQ')}
            </p>
          </Link>

          <Link
            to="/termsAndconditions"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_TandC_button_click')
            }
          >
            <p className="mod-text-align-center link-section-text">
              {t('links.termsAndConditions')}
            </p>
          </Link>

          <Link
            to="/privacyPolicy"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_privacyPolicy_button_click')
            }
          >
            <p className="mod-text-align-center link-section-text">
              {t('links.privacyPolicy')}
            </p>
          </Link>

          <Link
            to="/imprint"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_imprint_button_click')
            }
          >
            <p className="mod-text-align-center link-section-text">
              {t('links.imprint')}
            </p>
          </Link>
        </section>
      </section>
    </PageLayout>
  );
};

export default Home;
