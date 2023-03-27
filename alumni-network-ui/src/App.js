import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import { STORAGE_KEY_USER } from "./utils/storageKeys";
import { storageRead, storageSave } from "./utils/storage";
import { getUserInfo } from "./api/user";
import { useEffect, useState } from "react";
import AppContext from './context/UserContext'
import CalendarPage from "./pages/CalendarPage";
import GroupPage from "./pages/GroupPage";
import PostThread from "./components/Post/PostThread";
import Loading from "./components/Loading/Loading";
import UserPage from "./pages/UserPage";
import NewPostPage from "./pages/NewPostPage";
import NewGroupPage from "./pages/NewGroupPage";
import { STORAGE_KEY_LAST_VISITED_PAGE } from "./utils/storageKeys";
import EventPage from "./pages/EventPage";

function App() {

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      storageSave(STORAGE_KEY_USER, data);
      setUser(data);
      setLoading(false); 

      const lastVisitedPage = storageRead(STORAGE_KEY_LAST_VISITED_PAGE);
      if (lastVisitedPage) {
        window.location.href = lastVisitedPage;
      }
    };

    const userData = storageRead(STORAGE_KEY_USER);
    if (userData) {
      setUser(userData);
      setLoading(false);
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
              path="/posts/user/:postId"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <PostThread />
                </KeycloakRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <UserPage />
                </KeycloakRoute>
              }
            />
            <Route
              path="/newPost"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <NewPostPage />
                </KeycloakRoute>
              }
            />
          <Route
              path="/newGroup"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <NewGroupPage />
                </KeycloakRoute>
              }
            />
            <Route
              path="/event/:eventId"
              element={
                <KeycloakRoute role={ROLES.User}>
                  <EventPage />
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
