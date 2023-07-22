import './CSS/Fonts.css';
import './CSS/Icons.css';
import './CSS/Forms.css';
import './CSS/Core.css';
import './CSS/Navigation.css';
import './CSS/Mediaqueries.css';

import React, { Suspense, useEffect, useState, Component } from 'react';
import { Crisp } from 'crisp-sdk-web';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavigator from './Components/SideBarNav';
import { ConfigProvider, Modal } from 'antd';
import { AuthProvider } from './Components/AuthProvider';
import { checkTokenExists } from './linksStoreToFirebase';
import { useAuth } from './Components/AuthProvider';
import { fetchToken, onMessageListener } from './firebaseConfig';
import { TranslationProvider } from './Contexts/TranslationContext';

// import routes
import { routes as appRoutes } from './routes';

const App: React.FC = () => {
  Crisp.configure('d7c9a775-c889-4dfd-ba8c-b78075b2a6ef');

  const { uid } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [visible, setVisible] = useState(false); // for the modal
  useEffect(() => {
    if (uid) {
      fetchToken(setTokenFound, uid);
    }
  }, [uid]);

  const [isTokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    const unsubscribe = onMessageListener((payload: any) => {
      console.log('notif coming from here ', payload);

      // Construct a browser notification
      if (Notification.permission === 'granted') {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon, // assuming your payload has an icon property
        });
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(payload.notification.title, {
              body: payload.notification.body,
              icon: payload.notification.icon, // assuming your payload has an icon property
            });
          }
        });
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <TranslationProvider>
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
        </ConfigProvider>
      </AuthProvider>
    </TranslationProvider>
  );
};

export default App;
