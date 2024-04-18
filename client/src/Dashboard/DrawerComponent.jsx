import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import UpdateIcon from "@mui/icons-material/Update";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 250;

const MenuItem = ({ text, route, icon, handleMenuItemClick }) => (
  <ListItem
    disablePadding
    sx={{ width: "220px" }}
    onClick={() => handleMenuItemClick(text)}
  >
    <ListItemButton
      sx={{
        "&:hover": { backgroundColor: "#858BC5", borderRadius: "300px" },
      }}
      component={Link}
      to={route}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

const MenuItems = ({ handleMenuItemClick }) => {
  const menuItems = [
    {
      text: "All Logs",
      route: "/all-logs",
      icon: <ListAltIcon sx={{ color: "white" }} />,
    },
    {
      text: "Add Logs",
      route: "/add-logs",
      icon: <UpdateIcon sx={{ color: "white" }} />,
    },
    {
      text: "Update Password",
      route: "/update-password",
      icon: <VpnKeyIcon sx={{ color: "white" }} />,
    },
    {
      text: "Profile",
      route: "/profile",
      icon: <AccountCircleIcon sx={{ color: "white" }} />,
    },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.text}
          {...item}
          handleMenuItemClick={handleMenuItemClick}
        />
      ))}
    </>
  );
};

const DrawerComponent = ({
  mobileOpen,
  handleDrawerToggle,
  handleMenuItemClick,
  logoutHandler,
}) => (
  <Drawer
    variant={mobileOpen ? "temporary" : "permanent"}
    sx={{
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
        backgroundColor: "#021529",
      },
    }}
    open={mobileOpen}
    onClose={handleDrawerToggle}
    ModalProps={{
      keepMounted: true,
    }}
  >
    <Toolbar />
    <div className="logo">
      <img src={logo} alt="Your Logo" width="150vw" height="auto" />
    </div>
    <List
      sx={{
        p: 2,
        mt: 2,
        color: "white",
        fontSize: "2.2rem",
        justifyContent: "center",
      }}
    >
      <MenuItems handleMenuItemClick={handleMenuItemClick} />
      <MenuItem
        text={"Log Out"}
        icon={<ExitToAppIcon sx={{ color: "white" }} />}
        handleMenuItemClick={logoutHandler}
      />
    </List>
  </Drawer>
);

export default DrawerComponent;
