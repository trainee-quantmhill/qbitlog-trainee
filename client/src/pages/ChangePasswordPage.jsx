import React, { useState } from "react";
import logo from "../assets/logo1.png";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";

const ChangePassword = () => {
  const [inputs, setInputs] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    // Check if passwords match
    setIsPasswordMatch(inputs.newPassword === value);
  };

  const updatePassword = (event) => {
    event.preventDefault();

    console.log(inputs);
    // Add logic to update password
  };

  return (
    <>
      <div className="logo">
        <img src={logo} alt="Your Logo" width="150vw" height="auto" />
      </div>
      <Box className="Box-Layout">
        <section>
          <form>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Change Password{" "}
            </Typography>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>New Password</InputLabel>
              <Input
                type="password"
                name="newPassword"
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.newPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
              />
            </FormControl>
            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Confirm Password</InputLabel>
              <Input
                type="password"
                name="confirmPassword"
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.confirmPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
              />
              {!isPasswordMatch && inputs.confirmPassword && (
                <Typography sx={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>

            <Button
              onClick={updatePassword}
              variant="contained"
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: isPasswordMatch ? "#858BC5" : "grey",
              }}
              color="primary"
              disabled={!isPasswordMatch}
            >
              Confirm
            </Button>
          </form>
        </section>
      </Box>
    </>
  );
};

export default ChangePassword;
