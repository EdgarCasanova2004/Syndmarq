import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Links from "./pages/Links";
import PublicPortfolio from "./pages/PublicPortfolio";
import Design from "./pages/Design";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/links"
          element={<Links />}
        />

        <Route
          path="/design"
          element={<Design />}
        />

        <Route
          path="/statistics"
          element={<Statistics />}
        />

        <Route
          path="/u/:username"
          element={<PublicPortfolio />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;