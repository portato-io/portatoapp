import React from "react";
import { Typography } from "antd";
import PageLayout from "./Layouts/PageLayoutTest";

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <PageLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          This is our Home page
        </Title>
      </div>
    </PageLayout>
  );
};

export default Home;
