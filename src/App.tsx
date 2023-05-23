import './App.css';
import React, { Suspense, useEffect, useId, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavigator from './Components/SideBarNav';
import { Layout, ConfigProvider, Modal, Button } from 'antd';
import { AuthProvider } from './Components/AuthProvider';
import { getMessaging, getToken } from 'firebase/messaging'; // import Firebase Messaging
import {
  addNotificationsToken,
  checkTokenExists,
} from './linksStoreToFirebase';
import { useAuth } from './Components/AuthProvider';
import { fetchToken, messaging, onMessageListener } from './firebaseConfig';

// import routes
import { routes as appRoutes } from './routes';

const App: React.FC = () => {
  const { uid } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [visible, setVisible] = useState(false); // for the modal
  useEffect(() => {
    if (uid) {
      const checkToken = async () => {
        if (!(await checkTokenExists(uid))) {
          setVisible(true);
        }
      };
      checkToken();
    }
  }, [uid]);

  const [isTokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    const unsubscribe = onMessageListener((payload: any) => {
      console.log('notif coming from here ', payload);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleOk = () => {
    setVisible(false);
    fetchToken(setTokenFound, uid);
    //enableNotifications();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2897FF',
          },
        }}
      >
        <div>
          <Router>
            <SideNavigator openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {appRoutes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
            </Suspense>
          </Router>
        </div>

        <Modal
          title="Enable Notifications"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Would you like to enable notifications for our app?</p>
        </Modal>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default App;
