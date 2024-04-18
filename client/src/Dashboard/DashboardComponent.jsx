import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DrawerComponent from "./DrawerComponent";
import AppBarComponent from "./AppBarComponent";
import AllLog from "../Component/AllLogs";
import AddLogsComponent from "../Component/AddLogsComponent";
import UpdatePassword from "../Component/UpdatePassword";
import Profile from "../Component/Profile";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const drawerWidth = 250;

const PageAllLogs = () => <AllLog />;
const PageAddLogs = () => <AddLogsComponent />;
const PageUpdatePassword = () => <UpdatePassword />;
const PageProfile = () => <Profile />;

const MenuComponent = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All Logs");

  const container = window ? () => window().document.body : undefined;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenuItemClick = (text) => {
    setSelectedItem(text);
    setMobileOpen(false);
  };

  const logoutHandler = () => {
    Cookies.remove("token");
    nav("/");
  };
  const nav = useNavigate();

  const renderPage = () => {
    switch (selectedItem) {
      case "All Logs":
        return <PageAllLogs />;
      case "Add Logs":
        return <PageAddLogs />;
      case "Update Password":
        return <PageUpdatePassword />;
      case "Profile":
        return <PageProfile />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarComponent
        handleDrawerToggle={handleDrawerToggle}
        selectedItem={selectedItem}
      />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: { xs: "none", sm: "block" },
        }}
        aria-label="mailbox folders"
      >
        <DrawerComponent
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleMenuItemClick={handleMenuItemClick}
          logoutHandler={logoutHandler}
        />
      </Box>
      <Box
        component="main"
        
        sx={{
          marginTop: 10,
          padding: 1,
         
        }}
      >
        {renderPage()}
      </Box>
    </Box>
  );
};

MenuComponent.propTypes = {
  window: PropTypes.func,
};

export default MenuComponent;
