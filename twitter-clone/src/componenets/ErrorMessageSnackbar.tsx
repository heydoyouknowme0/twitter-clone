import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
interface ErrorComponentProps {
  errors: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errors }) => {
  const [open, setOpen] = useState(errors !== "");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <Snackbar
    //   open={open}
    //   autoHideDuration={3000}
    //   onClose={handleClose}
    //   a
    //   message={error}
    // />
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errors}
      </Alert>
    </Snackbar>
  );
};

export default ErrorComponent;
