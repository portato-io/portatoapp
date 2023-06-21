import React from 'react';
import { Typography, Card, Space } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
import backgroundImg from '../Assets/Images/landing_page_image2.png';
import portatoLogo from '../Assets/Images/logo_blue.png';
import howItWorksImg from '../Assets/Images/how_it_works.gif';
require('../CSS/PortatoStyleSheet.css');
require('../CSS/Home.css');
const { Title } = Typography;

const Home: React.FC = () => {
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
        <section className="explanation-section section-container boxed-section">
          <h2 className="font-comfortaa color-portato-blue section-title">
            How It Works
          </h2>
          <img
            className="how-it-works-animation"
            src={howItWorksImg}
            alt="Animated GIF"
          />
        </section>

        {/* About us */}
        <section className="about-section section-container boxed-section boxed-section-blue">
          <h2 className="font-comfortaa color-portato-blue section-title">
            About Us
          </h2>
          <h3 className="font-comfortaa">Our vision and mission</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus
            interdum ligula, sit amet ullamcorper sapien ullamcorper ut. Vivamus
            dapibus, urna nec tempor luctus, mauris risus efficitur justo, et
            gravida metus ex id enim.
          </p>
          <h3 className="font-comfortaa">Who we are and where we stand</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus
            interdum ligula, sit amet ullamcorper sapien ullamcorper ut. Vivamus
            dapibus, urna nec tempor luctus, mauris risus efficitur justo, et
            gravida metus ex id enim.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default Home;
