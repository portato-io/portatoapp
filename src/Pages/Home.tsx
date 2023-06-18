import React from 'react';
import { Typography, Card, Space } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
import backgroundImg from '../Assets/Images/landing_page_image.png';
import howItWorksImg from '../Assets/Images/how_it_works.gif';
require('../CSS/PortatoStyleSheet.css');
require('../CSS/Home.css');
const { Title } = Typography;

const Home: React.FC = () => {
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
