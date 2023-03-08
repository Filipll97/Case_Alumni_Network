import { BrowserRouter, Route, Routes } from "react-router-dom";
// import EditProfilePage from "./pages/EditProfilePage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import TestPage from "./pages/TestPage"
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/test" element={<TestPage />} />
          {/* <Route path="/products/:productId" element={<EditProfilePage />} /> */}
          <Route
            path="/profile"
            element={
              <KeycloakRoute role={ROLES.User}>
                <ProfilePage />
              </KeycloakRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
