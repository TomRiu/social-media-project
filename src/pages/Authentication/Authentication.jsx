import { Card, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Authentication = ({ children }) => {
  const auth = useSelector(store => store.auth);

  return (
    <div>
      <Grid container>
        <Grid className="h-screen overflow-hidden" item xs={7}>
          <img
            className="h-full w-full"
            src="https://img.freepik.com/free-photo/beautiful-rendering-dating-app-concept_23-2149316420.jpg?w=900"
            alt="Authentication Background"
          />
        </Grid>
        <Grid item xs={5}>
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="card p-8">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">Tom Social</h1>
                <p className="text-center text-sm w-[70%]">
                  Connecting Lives, Sharing Stories: Your Social World, Your Way
                </p>
              </div>

              {children}
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
