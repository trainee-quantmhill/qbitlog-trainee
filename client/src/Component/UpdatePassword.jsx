import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdatePassword = () => {
  const [inputs, setInputs] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = (passwordType) => {
    switch (passwordType) {
      case "CurrentPassword":
        setShowCurrentPassword((prevShow) => !prevShow);
        break;
      case "NewPassword":
        setShowNewPassword((prevShow) => !prevShow);
        break;
      case "ConfirmPassword":
        setShowConfirmPassword((prevShow) => !prevShow);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updating password...");
    console.log(inputs);
  };

  useEffect(() => {
    setIsFormFilled(
      inputs.CurrentPassword !== "" &&
        inputs.NewPassword !== "" &&
        inputs.ConfirmPassword !== ""
    );
    setIsPasswordMatch(inputs.NewPassword === inputs.ConfirmPassword);
  }, [inputs]);







  return (
    <Box className="Inner-Box-Layout" maxWidth={700}>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography color="#fff" sx={{ my: 1 }}>Current Password</Typography>
            <FormControl fullWidth>
              <TextField
                type={showCurrentPassword ? "text" : "password"}
                name="CurrentPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.CurrentPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility("CurrentPassword")
                        }
                        edge="end"
                        aria-label={
                          showCurrentPassword ? "hide password" : "show password"
                        }
                      >
                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography color="#fff" sx={{ my: 1 }}>New Password</Typography>
            <FormControl fullWidth>
              <TextField
                type={showNewPassword ? "text" : "password"}
                name="NewPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.NewPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility("NewPassword")}
                        edge="end"
                        aria-label={
                          showNewPassword ? "hide password" : "show password"
                        }
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography color="#fff" sx={{ my: 1 }}>Confirm Password</Typography>
            <FormControl fullWidth>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                name="ConfirmPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.ConfirmPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility("ConfirmPassword")
                        }
                        edge="end"
                        aria-label={
                          showConfirmPassword ? "hide password" : "show password"
                        }
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!isPasswordMatch && inputs.ConfirmPassword && (
                <Typography sx={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            height: "40px",
            borderRadius: "30px",
            
            fontSize: "1rem",
            fontWeight: "600",
            backgroundColor: isPasswordMatch ? "#858BC5" : "grey",
          }}
          disabled={!isFormFilled || !isPasswordMatch}
        >
          Confirm
        </Button>
</Grid>
        </Grid>
        
      </form>
    </Box>
  );
};

export default UpdatePassword;
