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
import MoritzImage from '../Assets/Images/team/moritz.webp';
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
  Moritz: MoritzImage,
};

require('../CSS/Home.css');

const Home: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const teamMemberNames = [
    'Conrad',
    'Mischa',
    'Chiara',
    'Hugo',
    'Mehdi',
    'Moritz',
  ];

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
        <img
          className="image circle team-member-image"
          src={image}
          alt={`Portrait of ${name}`}
        />
        <div className="listing-entry-content">
          <h3 className="">{name}</h3>
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
          <h1 className="text-align-center  mod-nomargin-top">
            {t('general.tagline')}
          </h1>

          <img src={headerImage} alt="Portato header image" />
        </section>
      </section>

      <section className="section">
        <div className="spacer-fluid-small"></div>
        {/* call to action 1 */}
        <div className="box-style-color-3 mod-overflow-hidden">
          <h2 className="text-align-center">{t('sendSection.title')}</h2>
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
          <h2 className="text-align-center">{t('driveSection.title')}</h2>
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
          <h2 className="text-align-center">{t('general.howItWorks')}</h2>
          <div className="video-wrapper">
            <LottieAnimation />
          </div>
        </section>
      </section>

      {/* Portato's mission */}
      <section className="section">
        <h2 className="text-align-center">{t('about.visionMissionTitle')}</h2>
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
      <div className="spacer-fluid-small"></div>
      <section className="section-bleed box-style-color-1">
        <section className="section text-color-white mod-nomargin-top mod-nomargin-bottom">
          <h2 className="text-align-center">{t('about.whoWeAreTitle')}</h2>

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
          <div className="spacer-fluid-small"></div>
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
        <h2 className="text-align-center">{t('social.heading')}</h2>
        <div className="spacer-fluid-regular"></div>
        <div className="mod-display-flex mod-flex-center">
          {socialChannelTypes.map((label) => (
            <SocialChannel socialLabel={label} key={label} />
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="section-bleed box-style-color-1 text-color-white mod-nomargin-top">
        <h2 className="text-align-center">{t('links.heading')}</h2>
        <div className="spacer-fluid-small"></div>
        <div>
          <Link
            className="mod-display-block text-color-white mod-small-margin-top text-align-center"
            to="/FAQ"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_FAQ_button_click')
            }
          >
            {t('links.FAQ')}
          </Link>

          <Link
            className="mod-display-block text-color-white mod-small-margin-top text-align-center"
            to="/termsAndconditions"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_TandC_button_click')
            }
          >
            {t('links.termsAndConditions')}
          </Link>

          <Link
            className="mod-display-block text-color-white mod-small-margin-top text-align-center"
            to="/privacyPolicy"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_privacyPolicy_button_click')
            }
          >
            {t('links.privacyPolicy')}
          </Link>

          <Link
            className="mod-display-block text-color-white mod-small-margin-top text-align-center"
            to="/imprint"
            onClick={() =>
              logEvent(analytics, 'home_moreInfo_imprint_button_click')
            }
          >
            {t('links.imprint')}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
