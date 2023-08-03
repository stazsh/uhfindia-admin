import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import NavigationPane from "./components/NavigationPane";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import Page404 from "./404/Page404";
import SignIn from "./session/SignIn";
import StaticNavigationBar from "./components/StaticNavigationBar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/dashboard/home");
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <NavigationBar>
              <NavigationPane />
            </NavigationBar>
          }
        />
        <Route
          path="/session/*"
          element={
            <Routes>
              <Route
                path="/signin"
                element={
                  <StaticNavigationBar>
                    <SignIn />
                  </StaticNavigationBar>
                }
              />
              {/* ... */}
            </Routes>
          }
        />
        <Route
          path="*"
          element={
            <NavigationBar>
              <Page404 />
            </NavigationBar>
          }
        />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
