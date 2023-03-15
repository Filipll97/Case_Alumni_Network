import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEventPage from "./pages/CreateEventPage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import PostPage from "./pages/PostPage";
import { STORAGE_KEY_USER } from "./utils/storageKeys";
import { storageRead, storageSave } from "./utils/storage";
import { getUserInfo } from "./api/user";
import { useEffect, useState } from "react";
import AppContext from './context/UserContext'

function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      storageSave(STORAGE_KEY_USER, data)
      setUser(data)
    };

    const userData = storageRead(STORAGE_KEY_USER);
    if (userData) {
      setUser(userData);
    } else {
      fetchData();
    }
  }, []);

  return (
    <AppContext>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/profile"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <ProfilePage />
                </KeycloakRoute>
              }
            />
            <Route
              path="/post"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <PostPage />
                </KeycloakRoute>
              }
            />
            <Route
              path="/createEvent"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <CreateEventPage />
                </KeycloakRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
