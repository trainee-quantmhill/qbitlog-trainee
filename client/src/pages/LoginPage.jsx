import React, { useState, useEffect } from "react";
import logo from "../assets/logo1.png";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Checkbox,
  Link,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import Navigate

import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    rememberMe: true,
    isEmailValid: true,
  });

  const [error, setError] = useState(null);
  const [showNewPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const isBothFieldsFilled = inputs.email.trim() !== "" && inputs.password.trim() !== "";
    const isEmailValid = validateEmail(inputs.email);
    setInputs(prevInputs => ({ ...prevInputs, isEmailValid }));
  }, [inputs.email, inputs.password]);

  const validateEmail = (email) => {
    if (email.trim() === "") return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const handleRememberMeChange = (event) => {
    const { name, checked } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: checked }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://qbitlog-trainee.onrender.com/api/login", {
        email: inputs.email,
        password: inputs.password,
      });

      Cookies.set("token", response.data.token);

      setInputs(prevInputs => ({
        ...prevInputs,
        email: "",
        password: "",
        rememberMe: true,
        isFormValid: false,
      }));

      navigate("/all-logs");
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      alert("Email and Password not Matched");
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/Home");
    }
  }, []);

  const isFormValid = inputs.email.trim() !== "" && inputs.password.trim() !== "" && inputs.isEmailValid;

  return (
    <>
      <div className="logo">
        <img src={logo} alt="Your Logo" width="150vw" height="auto" />
      </div>
      <Box className="Box-Layout">
        <section>
          <form>
            <Typography variant="h4" sx={{ color: "#fff", textAlign: "center", marginBottom: "30px", fontWeight: "bold" }}>
              Login
            </Typography>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Email</InputLabel>
              <Input
                type="email"
                autoComplete="off"
                name="email"
                required
                inputProps={{ maxLength: 35 }}
                value={inputs.email}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
              />
              {!inputs.isEmailValid && (
                <Typography sx={{ color: "red" }}>
                  Invalid email format
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", color: "#fff", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Password</InputLabel>
              <Input
                name="password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="off"
                value={inputs.password}
                onChange={handleInputChange}
                required
                inputProps={{ maxLength: 35 }}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { color: "white" },
                }}
              />
            </FormControl>

            <div style={{ marginBottom: "55px", fontSize: "0.85rem", color: "#fff", display: "flex", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  color="secondary"
                  name="rememberMe"
                  checked={inputs.rememberMe}
                  onChange={handleRememberMeChange}
                  sx={{ "&.Mui-checked": { color: "#858BC5" } }}
                />
                Remember Me
              </label>
              <Link href="/forgot" color="inherit" alignSelf="center" underline="hover">
                Forget Password
              </Link>
            </div>

            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: "#858BC5",
              }}
              color="primary"
              disabled={!isFormValid}
            >
              Log in
            </Button>

            <div style={{ fontSize: "0.9rem", color: "#fff", textAlign: "center", margin: "25px 0 10px" }}>
              <Typography variant="p" sx={{ fontSize: "0.9rem", color: "#fff", textAlign: "center", margin: "25px 0 10px" }}>
                Don't have an account?{" "}
                <Link href="/register" color="inherit" underline="hover">
                  Sign Up
                </Link>
              </Typography>
            </div>
          </form>
        </section>
      </Box>
    </>
  );
};

export default Login;
