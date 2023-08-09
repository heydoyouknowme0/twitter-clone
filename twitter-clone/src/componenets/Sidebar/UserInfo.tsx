import { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import "./UserInfo.css";
import { useUserAuth } from "../../auth";
import { useNavigate } from "react-router";

const UserInfo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logOut, user } = useUserAuth();
  const t = useNavigate();
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logOut();
    t("/");
    console.log("Logging out...");
  };

  return (
    <div className="userInfo">
      <div className="userInfo_sub">
        <Avatar className="userInfo__avatar" src={user?.avatar} />
        <span className="userInfo__info">
          <h4>{user?.displayname}</h4>@{user?.displayName}
        </span>
      </div>
      <div onClick={handleMenuOpen} className="userInfo__info">
        ...
      </div>
      <Menu open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;
