import "./App.css"
import React,{Suspense,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Drawer} from "antd";
import HeaderBar from "./Components/HeaderBar";
import BottomNavigation from "./Components/BottomBar";
import SideNavigator from "./Components/SideBarNav";
import ButtomHeaderBar from "./Components/ButtonHeaderBar";
import {MenuOutlined} from "@ant-design/icons"
import {Layout} from "antd";


// import routes
import { routes as appRoutes } from "./routes";


const { Header } = Layout;

const App: React.FC = () => {

  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div>
      <Router>
            <SideNavigator openMenu = {openMenu} setOpenMenu = {setOpenMenu} />
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
  );
};
export default App;
