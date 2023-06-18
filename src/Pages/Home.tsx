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
              Der einfache, guenstige und geile Transportdienst von deinen
              Homies.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="cta-section">
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
      <section className="explanation-section">
        <Card
          size="small"
          title="How It Works"
          style={{ width: '90vw', margin: 'auto' }}
        >
          <img src={howItWorksImg} alt="Animated GIF" />
        </Card>
      </section>

      {/* About us */}
      <section className="about-section">
        <Card
          size="small"
          title="About Us"
          style={{ width: '90vw', margin: 'auto' }}
        >
          <h3>Our vision and mission</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus
            interdum ligula, sit amet ullamcorper sapien ullamcorper ut. Vivamus
            dapibus, urna nec tempor luctus, mauris risus efficitur justo, et
            gravida metus ex id enim.
          </p>
          <h3>Who we are and where we stand</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus
            interdum ligula, sit amet ullamcorper sapien ullamcorper ut. Vivamus
            dapibus, urna nec tempor luctus, mauris risus efficitur justo, et
            gravida metus ex id enim.
          </p>
        </Card>
      </section>

      <div></div>
    </PageLayout>
  );
};

export default Home;
