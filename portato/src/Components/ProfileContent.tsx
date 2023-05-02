import React, { useEffect, useState } from "react";
import PageLayout from "../Pages/Layouts/PageLayoutTest";
import { List, Card } from "antd-mobile";
import { UserOutlined } from "@ant-design/icons";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { onAuthStateChanged, User } from "firebase/auth";
import AuthWrapper from "../Components/AuthWrapper";
import { useNavigate } from "react-router-dom";

import { Typography } from "antd";

const { Title } = Typography;

function ProfileContent() {
  const [user, setUser] = useState<User | null>(null);
  console.log("COOOOOOON");
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplay("");
      } else {
        console.log("User signed out"); // Added console log
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMyAccountClick = () => {
    // navigate to My Account screen
  };

  const handleMyPaymentMethodsClick = () => {
    // navigate to My Payment Methods screen
  };

  const handleMyDeliveriesClick = () => {
    // navigate to My Deliveries screen
  };

  const handleMySendRequestsClick = () => {
    navigate("/user_requests");
  };

  return (
    <PageLayout display={display}>
      <div style={{ display: display }} className="profile_content">
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "#2897FF",
          }}
        >
          <div
            style={{
              backgroundColor: "#2897FF",
              flex: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserOutlined style={{ fontSize: "48px" }} />
            </div>
          </div>
          <div style={{ backgroundColor: "#2897FF", flex: 6 }}>
            <Card style={{ borderRadius: "5%", height: "100%" }}>
              <List mode="card" style={{ marginTop: "10%" }}>
                <List.Item arrow={true} onClick={handleMyAccountClick}>
                  My Account
                </List.Item>
                <List.Item arrow={true} onClick={handleMyPaymentMethodsClick}>
                  My Payment Methods
                </List.Item>
                <List.Item arrow={true} onClick={handleMyDeliveriesClick}>
                  My Deliveries
                </List.Item>
                <List.Item arrow={true} onClick={handleMySendRequestsClick}>
                  My Send Requests
                </List.Item>
                <List.Item
                  arrow={true}
                  onClick={() => signOut(auth)}
                  style={{ color: "red" }}
                >
                  Sign out
                </List.Item>
              </List>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProfileContent;
