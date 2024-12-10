// src/components/SideBar/SideBar.jsx
import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Import Link if needed
import { resetAuthAction } from "../../Redux/Auth/auth.action";

const SideBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${user.profile.data?.id}`);
    } else {
      navigate(item.path);
    }
  };
  
  const handleLogout = () => {
    dispatch(resetAuthAction());
    navigate("/login");
  };
  
  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div className="">
          <span className="logo font-bold text-xl">Tom Social</span>
        </div>

        <div className="space-y-8">
          {navigationMenu.map((item) => (
            <div
              key={item.title} // Add unique key
              onClick={() => handleNavigate(item)}
              className="cursor-pointer flex space-x-3 items-center"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src="https://cdn-icons-png.flaticon.com/512/14996/14996907.png" />
            <div>
              <p className="font-bold">
                {user.profile.data?.firstName + " " + user.profile.data?.lastName}
              </p>
              <p className="opacity-70">{user.profile.data?.email.toLowerCase()}</p>
            </div>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SideBar;
