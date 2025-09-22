import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth
import LoginPlayer from "./pages/Auth/LoginPlayer";
import LoginAdmin from "./pages/Auth/LoginAdmin";
import Register from "./pages/Auth/Register";

// Users
import UserList from "./pages/Users/UserList";
import Profile from "./pages/Users/Profile";

// Admin Tournaments
import TournamentList from "./pages/Tournaments/TournamentList";
import CreateTournament from "./pages/Tournaments/CreateTournament";
import UpdateTournament from "./pages/Tournaments/UpdateTournament";
import AdminQuestionsViewer from "./pages/Tournaments/AdminQuestionsViewer";

// Player
import TournamentSelection from "./pages/Player/TournamentSelection";
import TournamentQuestions from "./pages/Player/TournamentQuestions";
import PlayerProgress from "./pages/Player/PlayerProgress";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Route protection
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Auth */}
          <Route path="/login-player" element={<LoginPlayer />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />

          {/* Profile (both roles) */}
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN", "PLAYER"]}>
                <Profile />
              </RoleProtectedRoute>
            }
          />

          {/* ------------------- ADMIN ROUTES ------------------- */}
          <Route
            path="/tournaments"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <TournamentList />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/tournaments/create"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <CreateTournament />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/tournaments/update"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <UpdateTournament />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId/questions"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminQuestionsViewer />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <UserList />
              </RoleProtectedRoute>
            }
          />

          {/* ------------------- PLAYER ROUTES ------------------- */}
          <Route
            path="/player/tournaments"
            element={
              <RoleProtectedRoute allowedRoles={["PLAYER"]}>
                <TournamentSelection />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/player/questions"
            element={
              <RoleProtectedRoute allowedRoles={["PLAYER"]}>
                <TournamentQuestions />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/player/progress"
            element={
              <RoleProtectedRoute allowedRoles={["PLAYER"]}>
                <PlayerProgress />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
