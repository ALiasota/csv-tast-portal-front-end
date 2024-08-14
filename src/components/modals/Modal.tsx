import React from "react";
import { Box, Modal, Button } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  buttonText: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ buttonText, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <Box sx={style}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            close
          </Button>
          <Box mt={2}>{children}</Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
