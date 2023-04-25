import React, { useEffect, useState } from "react";
import PageLayout from "../Layouts/PageLayoutTest";
import { Typography, Card, Modal } from "antd";
import ProgressBar from "../../Components/ProgressBar";
import ConfirmButton from "../../Components/Buttons/ConfirmButton";
import BackButton from "../../Components/Buttons/BackButton";
import SignInButton from "../../Components/Buttons/SignInButton";

import { useSelector } from "react-redux";
import { ObjectInfoState, IObjectInfo } from "../../type";
import { fetchDataOnce } from "../../linksStoreToFirebase";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import FirebaseAuth from "../../Components/FirebaseAuth";
import { uploadReduxStoreToFirebase } from "../../linksStoreToFirebase";
import { store } from "../../index";

const { Title } = Typography;
const progress = 100;

const Summary: React.FC = () => {
  const nextScreen = "/";
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const objecInfo = useSelector((state: IObjectInfo) => state);
  console.log(objecInfo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User signed in:", currentUser); // Added console log
        setUser(currentUser);
      } else {
        console.log("User signed out"); // Added console log
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleConfirm = () => {
    console.log("In handle confirm.");
    const currentUser = auth.currentUser;
    if (currentUser) {
      const uid = auth.currentUser?.uid; // Add the optional chaining operator here
      if (uid) {
        const state = store.getState();
        uploadReduxStoreToFirebase(uid, state);
      } else {
        console.log("User UID not found.");
      }
    } else {
      // Handle the case when no user is signed in
      console.log("No user is signed in.");
    }
  };

  return (
    <PageLayout>
      <ProgressBar progress={progress} />
      <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <FirebaseAuth />
        </div>
      </Modal>
      <Card
        bordered={true}
        style={{
          marginLeft: "10%",
          width: "80%",
          marginTop: "20%",
          backgroundColor: "#FFF4E4",
        }}
      >
        <Title level={2}> Summary </Title>
        <div>
          <Title level={4}> {objecInfo.name}</Title>
          <Typography>
            {" "}
            {objecInfo.description} / Size: {objecInfo.size} / Weight:{" "}
            {objecInfo.weight}
          </Typography>
        </div>
        <div>
          <Title level={4}> Pickup address</Title>
          <Typography> {objecInfo.pickup_adress} </Typography>
        </div>
        <div>
          <Title level={4}> Delivery address</Title>
          <Typography> {objecInfo.delivery_adress} </Typography>
        </div>
        <div>
          <Title level={4}>
            {" "}
            {objecInfo.dateRange[0]} - {objecInfo.dateRange[1]}
          </Title>
          <Typography> In: {objecInfo.time} </Typography>
        </div>
        <div>
          <Title level={4}> Price</Title>
          <Typography> {objecInfo.price} CHF </Typography>
        </div>
        <div>
          <Title level={4}> Images</Title>
          <Typography> {objecInfo.images} </Typography>
        </div>
      </Card>
      {user ? (
        <ConfirmButton onClick={handleConfirm} />
      ) : (
        <SignInButton onClick={showModal} />
      )}
      <BackButton />
    </PageLayout>
  );
};

export default Summary;
