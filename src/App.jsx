import { darkModeThunk } from "./store/slices/darkMode.slice";
import { Navigate, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

{/* Auth Imports */}
import { LoginPage } from "./components/pages/auth/login/LoginPage";
import { RegisterPage } from "./components/pages/auth/register/RegisterPage";
import { RecoveryPage } from "./components/pages/auth/recovery/RecoveryPage";
{/* End Auth Imports */}

{/* User Imports */}
import { ProtectedRoutes as UserProtectedRoutes } from "./components/pages/session/user/ProtectedRoutes";
import { HomePage as UserHomePage } from "./components/pages/user/home/HomePage";
import { ReservesPage as UserReservesPage } from "./components/pages/user/reserves/ReservesPage";
import { EventsPage as UserEventsPage } from "./components/pages/user/events/EventsPage";
import { SettingsPage as UserSettingsPage} from "./components/pages/user/settings/SettingsPage";
{/* End User Imports */}

function App() {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(darkModeThunk());
  }, [darkMode]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/recovery" element={<RecoveryPage />}/>
      <Route path="/" element={<UserProtectedRoutes />}>
        <Route path="/" element={<UserHomePage />}/>
        <Route path="/reserves" element={<UserReservesPage />}/>
        <Route path="/events" element={<UserEventsPage />}/>
        <Route path="/settings" element={<UserSettingsPage />}/>
      </Route>
    </Routes>
  )
}

export default App
