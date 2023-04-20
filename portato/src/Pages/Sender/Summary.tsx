import React, { useEffect, useState } from "react";
import PageLayout from "../Layouts/PageLayoutTest";
import { Typography, Card } from "antd";
import ProgressBar from "../../Components/ProgressBar";
import ConfirmButton from "../../Components/Buttons/ConfirmButton"; // Rename to ConfirmButton
import BackButton from "../../Components/Buttons/BackButton";
import SignInButton from "../../Components/Buttons/SignInButton";

import { useSelector } from "react-redux";
import { IObjectInfo } from "../../type";
import { fetchDataOnce } from "../../linksStoreToFirebase";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useHistory
import FirebaseAuth from "../../Components/FirebaseAuth";



const { Title } = Typography;
const progress = 100;

const Summary: React.FC = () => {
  const nextScreen = "/";
  const objecInfo = useSelector((state: IObjectInfo) => state);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate(); // Initialize useHistory

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

  console.log(objecInfo);
  fetchDataOnce();

  const handleSignInClick = () => {
    navigate("/firebase_auth");
  };


    return (
        <PageLayout>
            <ProgressBar progress={progress} />
            <Card
                bordered={true}
                style={{ marginLeft: "10%", width: "80%", marginTop: "20%", backgroundColor: "#FFF4E4" }}>
                <Title level = {2}> Summary </Title>
                        <div >
                            <Title level = {4}>  {objecInfo.name}</Title>
                            <Typography >  {objecInfo.description} / Size: {objecInfo.size} / Weight: {objecInfo.weight}</Typography>
                        </div>
                        <div >
                            <Title level = {4}> Pickup address</Title>
                            <Typography >  {objecInfo.pickup_adress} </Typography>
                        </div>
                        <div >
                            <Title level = {4}> Delivery address</Title>
                            <Typography >  {objecInfo.delivery_adress} </Typography>
                        </div>
                        <div >
                            <Title level = {4}> {objecInfo.dateRange[0]} - {objecInfo.dateRange[1]}</Title>
                            <Typography >  In: {objecInfo.time} </Typography>
                        </div>
                        <div >
                            <Title level = {4}> Price</Title>
                            <Typography >  {objecInfo.price} CHF </Typography>
                        </div>
                        </Card>
                        {user ? (
        <ConfirmButton />
      ) : (
        <SignInButton
            onClick={handleSignInClick}
        />
      )}
      <BackButton />
    </PageLayout>
  );
};

export default Summary;
