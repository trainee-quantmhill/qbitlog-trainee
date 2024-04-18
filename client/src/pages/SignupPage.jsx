import React, { useState } from "react";
import logo from "../assets/logo1.png";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Link,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isFormValid: false,
  });
  const [error, setError] = useState("");

  const isEmailValid = (email) => {
    if (email.trim() === "") return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newInputs = { ...inputs, [name]: value };
    const isFormValid =
      newInputs.email.trim() !== "" &&
      newInputs.password.trim() !== "" &&
      newInputs.confirmPassword.trim() !== "" &&
      isEmailValid(newInputs.email) &&
      newInputs.password === newInputs.confirmPassword;

    setInputs({
      ...newInputs,
      isFormValid,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://qbitlog-trainee.onrender.com/api/signup", {
        email: inputs.email,
        password: inputs.password,
      });
      alert("Sign Up Successful. Now You can Login");
      console.log(response.data);
      setInputs({
        email: "",
        password: "",
        confirmPassword: "",
        isFormValid: false,
      });
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      alert("This Email already Exists");
      console.error(error?.message || error?.response.data || 'This Email already Exists');
    }
  };

  return (
    <>
      <div className="logo">
        <img src={logo} alt="Your Logo" width="150vw" height="auto" />
      </div>
      <Box className="Box-Layout">
        <section>
          <form>
            <Typography variant="h4" sx={{ color: "#fff", textAlign: "center", marginBottom: "30px", fontWeight: "bold" }}>
              Sign Up
            </Typography>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Email</InputLabel>
              <Input
                type="email"
                name="email"
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.email}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
              />
              {!isEmailValid(inputs.email) && (
                <Typography sx={{ color: "red" }}>
                  Invalid email format
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Password</InputLabel>
              <Input
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleInputChange}
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                sx={{ color: "#fff" }}
              />
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Confirm Password</InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                value={inputs.confirmPassword}
                onChange={handleInputChange}
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                sx={{ color: "#fff" }}
              />
              {inputs.password !== inputs.confirmPassword && inputs.confirmPassword !== "" && (
                <Typography sx={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>

            <Button
              onClick={handleSignUp}
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
              disabled={!inputs.isFormValid}
            >
              Sign Up
            </Button>

            <div style={{ fontSize: "0.9rem", color: "#fff", textAlign: "center", margin: "25px 0 10px" }}>
              <Typography variant="p" sx={{ fontSize: "0.9rem", color: "#fff", textAlign: "center", margin: "25px 0 10px" }}>
                Already have an account?{" "}
                <Link href="/" color="inherit" underline="hover">
                  Login
                </Link>
              </Typography>
            </div>
          </form>
        </section>
      </Box>
    </>
  );
};

export default Signup;
