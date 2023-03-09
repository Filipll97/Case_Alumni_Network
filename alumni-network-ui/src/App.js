import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEventPage from "./pages/CreateEventPage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import { StrictMode } from "react";
import PostPage from "./pages/PostPage";


function App() {
  return (
    <BrowserRouter>
      <StrictMode>
        <Navbar />
        <main className="container">
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
      </StrictMode>
    </BrowserRouter>
  );
}

export default App;
