import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  MailOutlined,
  DeliveredProcedureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function HeaderBar({ isInline = false, setOpenMenu }: any) {
  const navigate = useNavigate();
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Menu
        onClick={({ key }) => {
          navigate(key);
          if (isInline) {
            setOpenMenu(false);
          }
        }}
        mode={isInline ? "inline" : "horizontal"}
        style={{ border: "none", background: "#1875BC" }}
        items={[
          {
            key: "/",
            icon: <HomeOutlined />,
            label: "Home",
          },
          {
            key: "/chat",
            icon: <MailOutlined />,
            label: "Chat",
          },
          {
            key: "/shipments",
            icon: <DeliveredProcedureOutlined />,
            label: "Shipments",
          },
          {
            key: "/profile",
            icon: <UserOutlined />,
            label: "Profile",
          },
          {
            key: "/about",
            label: "About",
          },
        ]}
      ></Menu>
    </div>
  );
}

export default HeaderBar;
