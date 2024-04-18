import React, { useState } from "react";
import logo from "../assets/logo1.png";
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  Typography,
  Box,
  Input,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const Forgot = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
  });

  const [otpFieldEnabled, setOTPFieldEnabled] = useState(false);
  const [emailFieldLocked, setEmailFieldLocked] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [showTryAnotherEmail, setShowTryAnotherEmail] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setEmailValid(isEmailValid(value));
  };

  const isEmailValid = (email) => {
    if (email.trim() === "") {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGetOTP = () => {
    if (!emailValid) {
      setShowTryAnotherEmail(true);
    } else {
      setOTPFieldEnabled(true);
      setEmailFieldLocked(true);
    }
  };

  const handleTryAnotherEmail = () => {
    setShowTryAnotherEmail(false);
    setEmailFieldLocked(false);
    setInputs({ ...inputs, email: "" });
  };

  const handleConfirmOTP = () => {
    navigate("/changepassword");
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
                marginBottom: "40px",
                fontWeight: "bold",
              }}
            >
              Forgot Password
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
                disabled={emailFieldLocked}
              />
              {!emailValid && !showTryAnotherEmail && (
                <Typography sx={{ color: "red" }}>
                  Invalid email format
                </Typography>
              )}
              {showTryAnotherEmail && (
                <Typography
                  sx={{ color: "green", cursor: "pointer" }}
                  onClick={handleTryAnotherEmail}
                >
                  Try with another email
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Enter OTP</InputLabel>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "center", marginLeft: 3 }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <OTPInput
                  value={inputs.otp}
                  onChange={(otp) => setInputs({ ...inputs, otp })}
                  numInputs={4}
                  isInputNum
                  containerStyle={{ marginTop: "60px" }}
                  separator={<span>-</span>}
                  inputStyle={{
                    borderRadius: "10px",
                    border: "1px solid ",
                    padding: "10px",
                    width: "40px",
                    color: "black",
                    marginRight: "27px",
                    backgroundColor: otpFieldEnabled ? "#858BC5" : " #A0A8D0",
                    pointerEvents: otpFieldEnabled ? "auto" : "none",
                  }}
                  focusStyle={{ borderColor: "#858BC5" }}
                  hasErrored={false}
                  renderInput={(props, index) => (
                    <input
                      {...props}
                      disabled={!otpFieldEnabled}
                      style={{
                        backgroundColor: otpFieldEnabled ? "#858BC5" : " #A0A8D0",
                        borderRadius: "10px",
                        border: "1px solid ",
                        padding: "10px",
                        width: "40px",
                        color: "black",
                        marginRight: "27px",
                      }}
                    />
                  )}
                />
              </Stack>
            </FormControl>

            <Button
              onClick={otpFieldEnabled ? handleConfirmOTP : handleGetOTP}
              variant="contained"
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: emailValid ? "#858BC5" : "grey",
              }}
              color="primary"
              disabled={
                !inputs.email || (!otpFieldEnabled && !emailValid)
              }
            >
              {otpFieldEnabled ? "Confirm OTP" : "Get OTP"}
            </Button>

            <div
              style={{
                fontSize: "0.9rem",
                color: "#fff",
                textAlign: "center",
                margin: "25px 0 10px",
              }}
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: "0.9rem",
                  color: "#fff",
                  textAlign: "center",
                  margin: "25px 0 10px",
                }}
              >
                Remember the password?{" "}
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

export default Forgot;
