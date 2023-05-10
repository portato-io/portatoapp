import './App.css';
import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavigator from './Components/SideBarNav';
import { Layout, ConfigProvider } from 'antd';

// import routes
import { routes as appRoutes } from './routes';

const { Header } = Layout;

const App: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
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
  );
};
export default App;
