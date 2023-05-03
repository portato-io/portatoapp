import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchDataOnce } from "../linksStoreToFirebase";
import styles from "./UserRequests.module.css";
import { IObjectInfo } from "../type";
import { Card, Typography, Image } from "antd";

const UserRequests: React.FC = () => {
  const [requests, setRequest] = useState<IObjectInfo[]>([]);

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    let user_requests = new Promise<any>((resolve, reject) => {});

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      const data = fetchDataOnce(uid);
      if (data) {
        user_requests = data.then((storesArray) => {
          return storesArray;
        });
      }
    }

    const getUserRequests = async () => {
      const a = await user_requests;
      setRequest(Object.values(a));
    };

    getUserRequests();
  }, []);

  return (
    <div>
      <h1
        style={{
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Your Current Requests
      </h1>
      <div>
        {requests.map((request) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{ marginTop: "5%", width: "80%" }}
              title={request.name}
            >
              {request.weight}/{request.size}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRequests;
