import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import NavigationPane from "./components/NavigationPane";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import Page404 from "./404/Page404";
import SignIn from "./session/SignIn";
import StaticNavigationBar from "./components/StaticNavigationBar";
import { UserContext } from "./context/UserContext";

function App() {
  const navigate = useNavigate();

  const [userContextObj, setUserContextObj] = useState({
    org: "",
    email: "",
    name: "User",
    profurl: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    role: "NA",
  });

  useEffect(() => {
    const goToSignin = () => navigate("/session/signin");

    const runFirst = async () => {
      const refreshToken = localStorage.getItem("uhf_jwt_ref");

      if (refreshToken) {
        try {
          const res = await axios({
            method: "get",
            url: "https://lipsum.jayantapandit.me/v1/crm/session/reftoken",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (res.data.success) {
            setUserContextObj(res.data.user_obj);
            localStorage.setItem("uhf_jwt", res.data.jwt);
            navigate("/dashboard/home");
          }
        } catch (e) {
          goToSignin();
        }
      } else {
        goToSignin();
      }
    };

    // runFirst();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserContext.Provider value={{ userContextObj, setUserContextObj }}>
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
      </UserContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
