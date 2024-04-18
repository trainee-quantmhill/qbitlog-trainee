import React from "react";
import LoginPage from "./pages/LoginPage"; // Importing the LoginComponent
import SignupPage from "./pages/SignupPage"; // importing Signupcomponent
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPage from "./pages/ForgotPage";
import DashboardComponent from "./Dashboard/DashboardComponent";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  return (
    
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/register" exact element={<SignupPage />} />
          <Route path="/forgot" exact element={<ForgotPage />} />
          <Route
            path="/changepassword"
            exact
            element={<ChangePasswordPage />}
          />
          <Route path="/Home" exact element={<DashboardComponent />} />
          <Route
            path="/all-logs"
            element={<DashboardComponent selectedItem="All Logs" />}
          />
          <Route
            path="/add-logs"
            element={<DashboardComponent selectedItem="Add Logs" />}
          />
          <Route
            path="/update-password"
            element={<DashboardComponent selectedItem="Update Password" />}
          />
          <Route
            path="/profile"
            element={<DashboardComponent selectedItem="Profile" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
    




    
  );
}

export default App;