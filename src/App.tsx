import './App.css';
import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavigator from './Components/SideBarNav';
import { Layout, ConfigProvider } from 'antd';
import { AuthProvider } from './Components/AuthProvider';

// import routes
import { routes as appRoutes } from './routes';

const App: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

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
      </ConfigProvider>
    </AuthProvider>
  );
};
export default App;
