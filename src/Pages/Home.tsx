import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import headerImage from '../Assets/Images/portato-landing-8.png';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import LottieAnimation from '../Assets/Lotties/how-it-works-animation';
import ConradImage from '../Assets/Images/team/conrad.jpg';
import HugoImage from '../Assets/Images/team/hugo.jpg';
import MehdiImage from '../Assets/Images/team/mehdi.jpg';
import MischaImage from '../Assets/Images/team/mischa.jpg';
import ChiaraImage from '../Assets/Images/team/chiara.jpg';

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
    const image = getTeamMemberImage(t(`team.${memberName}.image`));
    console.log('image', image);

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

  /* SOCIALS ------------------------------------------------------ */
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
        target="_blank"
      >
        <i className={icon} />
        <span>{label}</span>
      </a>
    );
  };

  return (
    <PageLayout>
      {/* Landing screen */}
      <section className="section mod-nopadding mod-nomargin-top">
        <img
          src={headerImage}
          alt="portato header image"
          className="image header-image"
        />
      </section>

      <section className="section">
        <div className="text-section">
          <h1 className="icon icon-logo icon-big logo-slogan">portato</h1>
          <h5>{t('general.tagline')}</h5>
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
          <LottieAnimation />
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
    </PageLayout>
  );
};

export default Home;
