import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfileAction } from "../../Redux/User/user.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth, post, user } = useSelector((store) => store);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user.profile.data?.firstName,
      lastName: user.profile.data?.lastName
    },
    onSubmit: (values) => {
      console.log("values ", values);
      dispatch(updateProfileAction(values));
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-md"
                  src="https://images.pexels.com/photos/386025/pexels-photo-386025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="pl-5">
                <Avatar
                  className="transform -translate-y-24"
                  sx={{ width: "10rem", height: "10rem" }}
                  src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/315367609_5500176540092887_7537861654572062772_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=8GjadgMNc4sQ7kNvgEqInbp&_nc_ht=scontent.fhan15-1.fna&_nc_gid=AUpmJCUyVdczo3o2UtFA5fq&oh=00_AYAbJOTDMKl1L6wYyv-EgZY6dq5U1QV1rdw0zOBkbO_caA&oe=6702DF96"
                />
              </div>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
