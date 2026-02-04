import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stages from "./pages/Stages";
import Levels from "./pages/Levels";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import LevelCompleted from "./pages/LevelCompleted";

import BeeMascot from "./components/BeeMascot";
import PageWrapper from "./components/PageWrapper";

/* ======================================
   ROUTE WRAPPER
====================================== */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />

        <Route
          path="/stages"
          element={
            <PageWrapper>
              <Stages />
            </PageWrapper>
          }
        />

        <Route
          path="/levels/:stage"
          element={
            <PageWrapper>
              <Levels />
            </PageWrapper>
          }
        />

        <Route
          path="/game/:stage/:level"
          element={
            <PageWrapper>
              <Game />
            </PageWrapper>
          }
        />

        <Route
          path="/completed/:stage/:level"
          element={
            <PageWrapper>
              <LevelCompleted />
            </PageWrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ======================================
   MAIN APP
====================================== */
export default function App() {
  return (
    <BrowserRouter>
      {/* 🐝 Bee visible on all pages */}
      <BeeMascot />

      <AnimatedRoutes />
    </BrowserRouter>
  );
}
