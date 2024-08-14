import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ApiService from "../../services/ApiService";

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
  id: string;
  setOpenEdit: (e: boolean) => void;
  getTasks: () => Promise<void>;
}

const ModalEdit: React.FC<CustomModalProps> = ({
  id,
  setOpenEdit,
  getTasks,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleClose = () => setOpenEdit(false);

  const getTask = async () => {
    try {
      const response = await ApiService.getTaskById(id);
      if (response) {
        setTask({
          title: response.title,
          description: response.description,
          completed: response.completed,
        });
      } else {
        alert("Failed to fetch task");
      }
    } catch (error) {
      alert("Failed to fetch task");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await ApiService.updateTask(id, task);
      console.log("Task updated successfully:", response);
      getTasks();
      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Box sx={style}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          close
        </Button>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={task.completed}
                onChange={handleChange}
                name="completed"
              />
            }
            label="Completed"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Task
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
