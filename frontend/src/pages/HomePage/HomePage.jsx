// src/pages/HomePage/HomePage.jsx
import { Grid } from "@mui/material";
import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import MiddlePart from "../../components/MiddlePart/MiddlePart";
import Reels from "../../components/Reels/Reels";
import CreateReelsForm from "../../components/Reels/CreateReelsForm";
import Profile from "../Profile/Profile";
import HomeRight from "../../components/HomeRight/HomeRight";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const location = useLocation();
  const auth = useSelector((store) => store.auth);

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <SideBar />
          </div>
        </Grid>
        <Grid
          lg={location.pathname.startsWith("/profile") ? 9 : 6} // Adjust grid size based on route
          item
          className="px-5 flex justify-center"
          xs={12}
        >
          <Outlet /> {location.pathname === "/" && <MiddlePart />}
        </Grid>

        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
