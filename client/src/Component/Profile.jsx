import React, { useState } from "react";
import {
  Button,
  FormControl,
  Container,
  Typography,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);
    setIsFormFilled(value !== "" && email !== "");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
    setIsFormFilled(fullName !== "" && value !== "");
  };

  const validateEmail = (email) => {
    if (email.trim() === "") return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    console.log("Saving profile...");
  };

  return (
    <>
      <Box
       className="Inner-Box-Layout"
      >
        <Typography variant="h5" className="Input-Label" sx={{ marginBottom: "3px" }}>
          Personal Information
        </Typography>
        <Typography
          variant="subtitle1"
          className="Input-Label"
          sx={{ marginBottom: "10px", fontSize: "0.8rem" }}
        >
          Details about your personal information
        </Typography>
        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ color: "white", width: "100%", height: "100%" }}
                />
              )}
            </div>
            <label htmlFor="profile-picture-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                sx={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "40px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "background-color 0.4s ease",
                  backgroundColor: "#858BC5",
                  mt: "13px",
                }}
              >
                Change Profile
              </Button>
              <input
                type="file"
                id="profile-picture-input"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: "none" }}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Full Name
            </Typography>
            <FormControl fullWidth sx={{ my: "30px" }}>
              <TextField
                type="text"
               
                name="fullName"
                variant="standard"
                autoComplete="off"
                value={fullName}
                onChange={handleFullNameChange}
                
              />
            </FormControl>
            <Typography className="Input-Label" sx={{ my: 1 }}>
              Email
            </Typography>
            <FormControl fullWidth sx={{ my: "30px"}}>
              <TextField
                type="email"
                name="email"
                autoComplete="off"
                variant="standard"
                inputProps={{ maxLength: 35 }}
                value={email}
                onChange={handleEmailChange}
              />
              {!isEmailValid && (
                <Typography sx={{ color: "red" }}>
                  Invalid email format
                </Typography>
              )}
            </FormControl>
            <Button
            
              variant="contained"
              onClick={saveProfile}
              disabled={!isFormFilled || !isEmailValid}
              sx={{
                marginTop: 5.8,
                width: "100%",
                height: "40px",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: "#858BC5",
              }}
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
