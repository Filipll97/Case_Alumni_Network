import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import PostPage from "./pages/PostPage";
import { STORAGE_KEY_USER } from "./utils/storageKeys";
import { storageRead, storageSave } from "./utils/storage";
import { getUserInfo } from "./api/user";
import { useEffect, useState } from "react";
import AppContext from './context/UserContext'
import CalendarPage from "./pages/CalendarPage";
import GroupPage from "./pages/GroupPage";
import PostThread from "./components/Post/PostThread";
import Loading from "./components/loading/Loading";

function App() {

  const [user, setUser] = useState()
   const [loading, setLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      storageSave(STORAGE_KEY_USER, data);
      setUser(data);
      setLoading(false); // Set loading to false once user data has been fetched
    };

    const userData = storageRead(STORAGE_KEY_USER);
    if (userData) {
      setUser(userData);
      setLoading(false); // Set loading to false if user data is already available in storage
    } else {
      fetchData();
    }
  }, []);

  if (loading) {
    return <Loading message="Loading..." />;
  }

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
              path="/calendar"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <CalendarPage />
                </KeycloakRoute>
              }
            />
            <Route
              path="/groups/:groupId"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <GroupPage />
                </KeycloakRoute>
              }
            />
              <Route
              path="/posts/:postId"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <PostThread />
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
