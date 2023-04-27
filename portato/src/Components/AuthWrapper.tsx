import React from "react";
import { Spin } from "antd";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import FirebaseAuth from "../Components/FirebaseAuth";

interface AuthWrapperProps {
  Component: React.FC;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ Component }) => {
  const [user, setUser] = React.useState<User | null | "loading">("loading");
  console.log(user);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged:", currentUser); // Added console log
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user === "loading") {
    console.log("Rendering loading spinner"); // Added console log
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Spin size="large" />
      </div>
    );
  } else {
    console.log("Rendering user in else:", user); // Added console log

    return user ? <Component /> : <FirebaseAuth />;
  }
};

export default AuthWrapper;
