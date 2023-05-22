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

  // useEffect(() => {
  //   // Check for service worker
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', function () {
  //       navigator.serviceWorker.register('/service_worker.ts').then(
  //         function (registration: ServiceWorkerRegistration) {
  //           console.log(
  //             'Service Worker registered with scope: ',
  //             registration.scope
  //           );
  //         },
  //         function (err: any) {
  //           console.log('Service Worker registration failed: ', err);
  //         }
  //       );
  //     });
  //   }
  // }, []);

  const enableNotifications = () => {
    Notification.requestPermission().then(function (status) {
      console.log('Notification permission status:', status);
      if (status === 'granted') {
        subscribeUser();
      }
    });
  };

  const subscribeUser = async () => {
    // Get Firebase Messaging instance
    try {
      // Get the user's token
      const token = await getToken(messaging, {
        vapidKey:
          'BN1R0jA9hh7euhpDZ_AjxNvffl-Tcrlx9t7ijnKg6MJjuMSaEuVf1DNQPe-jINpqinR4Ihv6nXPFwMPxDqFq3vo',
      });
      console.log('User FCM token:', token);
      addNotificationsToken(uid, token);
      // TODO: Send this token to your server or use it directly to send push notifications.
    } catch (error) {
      console.error('Failed to get user FCM token', error);
    }
  };

  const [isTokenFound, setTokenFound] = useState(false);

  fetchToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  const handleOk = () => {
    setVisible(false);
    enableNotifications();
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
