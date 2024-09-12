import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Animation from "./views/layout/Animation";
import { AnimatePresence } from "framer-motion";
import ShowLoading from "./views/Loading";

const Login = lazy(() => import("./views/Auth/Login"));

const Register = lazy(() => import("./views/Auth/Register"));

const Home = lazy(() => import("./views/Home"));

const AttackHub = lazy(() => import("./views/Hub"));

const UpgradeShowPlans = lazy(() => import("./views/Upgrade"));

const UpgradeInvoice = lazy(() => import("./views/Invoice"));

const APIManager = lazy(() => import("./views/APIManager"));

const APIManagerDoc = lazy(() => import("./views/APIManager/Documentation"));

const APIManagerKeys = lazy(() => import("./views/APIManager/Manage"));

const Profile = lazy(() => import("./views/Profile"));

const ProfileAccount = lazy(() => import("./views/Profile/Account"));

const ProfilePreferences = lazy(() => import("./views/Profile/Preferences"));

const UserTickets = lazy(() => import("./views/Support/Ticket"));

export function WebRoutes() {
  return (
    <Router>
      <AnimatePresence>
        <Suspense fallback={<ShowLoading />}>
          <Routes>
            <Route element={<Animation />}>
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route strict path="/home" element={<Home />} />

              <Route path="/hub" element={<AttackHub />} />

              <Route path="/upgrade">
                <Route index element={<UpgradeShowPlans />} />
                <Route path="order/:id" element={<UpgradeInvoice />} />
              </Route>

              <Route path="/api-manager" element={<APIManager />}>
                <Route index element={<APIManagerDoc />} />
                <Route path="keys" element={<APIManagerKeys />} />
                <Route path="*" element={<Navigate to="/api-manager" />} />
              </Route>

              <Route path="/support" element={<UserTickets />} />

              <Route path="/profile" element={<Profile />}>
                <Route index element={<ProfileAccount />} />
                <Route path="preferences" element={<ProfilePreferences />} />
                <Route path="*" element={<Navigate to="/profile" />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Router>
  );
}
