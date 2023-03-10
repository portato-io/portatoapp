import React,{Suspense} from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// import routes
import { routes as appRoutes } from "./routes";


const theme = createTheme({
  palette: {
    primary: {
      light: "#63b8ff",
      main: "#0989e3",
      dark: "#005db0",
      contrastText: "#000",
    },
    secondary: {
      main: "#1875bc",
      light: "#82e9de",
      dark: "#00867d",
      contrastText: "#000",
    },
  },
});


const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box height="100vh" display="flex" flexDirection="column">
    <Router>
      <Navbar/>
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
      <Footer />
    </Router>
    </Box>
  </ThemeProvider>
);
export default App;