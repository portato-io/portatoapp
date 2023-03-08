import React,{lazy,Suspense} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const About = lazy(() => import('./Pages/About'));
const Home = lazy(() => import('./Pages/Home'));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/about" element = {<About />} />
        <Route path="/" element = {<Home />} />
      </Routes>
    </Suspense>
  </Router>
);
export default App;